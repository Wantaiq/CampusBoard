import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import TaskForm from './TaskForm';
import { useState } from 'react';
import useParticipants from '@/features/participants/hooks/useParticipants';
import useTasks from '../hooks/useTasks';

function CreateTaskModal({ projectId }) {
  const [open, setOpen] = useState(false);
  const { participants } = useParticipants(projectId);
  const { createTask } = useTasks(projectId);

  return (
    <Dialog.Root
      placement="center"
      motionPreset="slide-in-top"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        <Button>Create task +</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxH="4xl" overflowY="auto" scrollbarWidth="thin">
            <Dialog.Header>
              <Dialog.Title fontSize="2xl">New task</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <TaskForm
                onSubmit={async (e) => {
                  await createTask(e);
                  setOpen(false);
                }}
                participants={participants}
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

export default CreateTaskModal;
