import { Box, Button, Drawer, Portal } from '@chakra-ui/react';
import SidebarContent from './SidebarContent';

function Sidebar({ projects }) {
  return (
    <>
      <Drawer.Root placement="start">
        <Drawer.Trigger asChild>
          <Button
            display={{ base: 'flex', md: 'none' }}
            position="fixed"
            top="4"
            right="4"
            zIndex="overlay"
            aria-label="Open menu"
          >
            Menu
          </Button>
        </Drawer.Trigger>

        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content maxW="280px" maxH="100dvh" py="12">
              <Drawer.CloseTrigger asChild>
                <Button aria-label="Close navigation menu" variant="ghost">
                  X
                </Button>
              </Drawer.CloseTrigger>

              <Drawer.Body p="0">
                <SidebarContent projects={projects} />
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      <Box
        as="header"
        borderRightWidth="1px"
        borderRightColor="gray.border"
        shadow="sm"
        py="6"
        maxH="100dvh"
        display={{ base: 'none', md: 'block' }}
        h="full"
      >
        <Box as="nav" h="full">
          <SidebarContent projects={projects} />
        </Box>
      </Box>
    </>
  );
}

export default Sidebar;
