import { useParams } from 'react-router';
import PageRenderer from '@/components/PageRenderer';
import TasksSection from '@/features/tasks/components/TasksSection';
import ParticipantsSection from '@/features/participants/components/ParticipantsSection';
import useProject from '../hooks/useProject';
import DocumentsSection from '@/features/documents/components/DocumentsSection';
import ProjectHeader from '../components/ProjectHeader';
import { Box, Flex } from '@chakra-ui/react';

function ProjectPage() {
  const { id } = useParams();
  const { project, loading, error } = useProject(id);

  return (
    <Box maxH="100dvh" minH="100dvh" overflowY="auto" scrollbarWidth="thin" bg="teal.50">
      <PageRenderer loading={loading} error={error}>
        {project && (
          <>
            <ProjectHeader id={id} />
            <Flex
              px={{ base: '14px', md: '16' }}
              py="8"
              gap="28"
              alignItems="start"
              flexDir={{ base: 'column', md: 'row' }}
            >
              <TasksSection projectId={id} />
              <Flex flexDir="column" gap="3">
                <DocumentsSection projectId={id} />
                <ParticipantsSection role={project.role} projectId={id} />
              </Flex>
            </Flex>
          </>
        )}
      </PageRenderer>
    </Box>
  );
}

export default ProjectPage;
