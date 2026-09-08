import { useLocation } from 'react-router';
import CreateProjectModal from '@/features/projects/components/CreateProjectModal';
import { AbsoluteCenter, Box, Flex, Text } from '@chakra-ui/react';

function DashboardPage() {
  const location = useLocation();
  const newUser = location.state?.newUser ?? false;

  if (newUser) {
    return (
      <AbsoluteCenter>
        <Flex flexDir="column" gap="6" alignItems="start">
          <Text as="h1" fontSize="2xl" fontWeight="semibold">
            Welcome! Start with creating your first project!
          </Text>
          <Box mx="auto">
            <CreateProjectModal />
          </Box>
        </Flex>
      </AbsoluteCenter>
    );
  }

  return (
    <AbsoluteCenter>
      <Flex flexDir="column" gap="6" alignItems="start">
        <Text as="h1" fontSize="2xl" fontWeight="semibold">
          Continue with starting a new project
        </Text>
        <Box mx="auto">
          <CreateProjectModal />
        </Box>
      </Flex>
    </AbsoluteCenter>
  );
}

export default DashboardPage;
