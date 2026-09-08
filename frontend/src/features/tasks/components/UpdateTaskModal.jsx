import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import TaskForm from './TaskForm';
import useTask from '../hooks/useTask';

function UpdateTaskModal({ task, participants }) {
  const { updateTask } = useTask(task.id);

  return (
    <Dialog.Root
      placement="center"
      motionPreset="slide-in-top">
      <Dialog.Trigger asChild>
        <Button
          size="sm"
          variant="outline">
          Edit
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title fontSize="2xl">Edit task</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <TaskForm
                onSubmit={async (values) => await updateTask(values)}
                participants={participants}
                defaultValues={{
                  name: task.name,
                  description: task.description,
                  dueDate: new Date(task.deadline),
                  assigneeId: task.assignee_id,
                  status: task.status,
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

export default UpdateTaskModal;
