import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import AddParticipantModal from '@/features/participants/components/AddParticipantModal';
import AddDocumentModal from '@/features/documents/components/AddDocumentModal';
import CreateTaskModal from '@/features/tasks/components/CreateTaskModal';
import useProject from '../hooks/useProject';

function ProjectHeader({ id }) {
  const navigate = useNavigate();
  const { project, deleteProject } = useProject(id);

  return (
    <Flex
      borderBottomColor="gray.border"
      borderBottomWidth="1px"
      shadow="sm"
      px={{ base: '14px', md: '16' }}
      py={{ base: 14, md: 8 }}
      bg="bg"
      flexDir={{ base: 'column', md: 'row' }}
      justifyContent="space-between">
      <Box pe="12">
        <Box maxW="2xl">
          <Text
            truncate
            as="h1"
            color="teal"
            fontWeight="bold"
            fontSize="2xl">
            {project.name}
          </Text>
        </Box>
        <Text
          textWrap="wrap"
          color="fg.muted">
          {project.description}
        </Text>
      </Box>
      <Flex
        mt={{ base: '4', md: 0 }}
        gap="4"
        flexDir={{ base: 'column', md: 'row' }}>
        <Flex gap="4">
          <CreateTaskModal projectId={id} />
          <AddParticipantModal projectId={id} />
        </Flex>
        <Flex gap="4">
          <AddDocumentModal projectId={id} />
          {project.role === 'owner' && (
            <Button
              variant="outline"
              colorPalette="red"
              onClick={async () => {
                await deleteProject();
                navigate('/');
              }}>
              Delete
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ProjectHeader;
