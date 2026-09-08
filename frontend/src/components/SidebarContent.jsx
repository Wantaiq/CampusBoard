import { Box, Button, Flex, Link, Separator, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import CreateProjectModal from '../features/projects/components/CreateProjectModal';
import ProjectsList from '../features/projects/components/ProjectsList';

function SidebarContent({ projects }) {
  return (
    <Flex
      h="full"
      flexDir="column"
      gap="6">
      <Box px="6">
        <Flex
          justify="center"
          mb="5">
          <Link
            as={RouterLink}
            to="/">
            <Text
              fontFamily="Inter, Segoe UI, sans-serif"
              fontSize="2xl"
              fontWeight="800"
              color="gray.700"
              lineHeight="1">
              Campus
              <Box
                as="span"
                color="teal">
                Board
              </Box>
            </Text>
          </Link>
        </Flex>

        <CreateProjectModal />

        <Separator mt="4" />
      </Box>

      <Box
        flex="1"
        px="6"
        overflowY="auto">
        {!!projects.length && <ProjectsList projects={projects} />}
      </Box>

      <Box px="6">
        <Separator mb="4" />

        <Button
          w="full"
          asChild
          variant="subtle"
          colorPalette="gray">
          <RouterLink to="/auth/logout">Logout</RouterLink>
        </Button>
      </Box>
    </Flex>
  );
}

export default SidebarContent;
