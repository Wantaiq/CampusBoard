import { List, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router';

function ProjectsList({ projects }) {
  return (
    <List.Root unstyled overflow="hidden">
      {projects.map((project) => (
        <List.Item key={project.id} py="1">
          <Button
            minW="full"
            maxW="full"
            fontSize="md"
            size="md"
            asChild
            color="gray.fg"
            justifyContent="start"
            variant="ghost"
            fontWeight="semibold"
            _currentPage={{ colorPalette: 'teal', bg: 'teal.100' }}
          >
            <NavLink to={`projects/${project.id}`}>{project.name}</NavLink>
          </Button>
        </List.Item>
      ))}
    </List.Root>
  );
}

export default ProjectsList;
