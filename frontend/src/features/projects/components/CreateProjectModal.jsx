import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import ProjectForm from './ProjectForm';
import { useState } from 'react';
import useProjects from '../hooks/useProjects';

function CreateProjectModal() {
  const [open, setOpen] = useState(false);
  const { createProject } = useProjects();

  return (
    <Dialog.Root
      placement="center"
      motionPreset="slide-in-top"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button w="full">Create project +</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title fontSize="2xl">New project</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <ProjectForm
                onCreate={async (e) => {
                  await createProject(e);
                  setOpen(false);
                }}
              />
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default CreateProjectModal;
