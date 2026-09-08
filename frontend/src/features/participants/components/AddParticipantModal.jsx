import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import ParticipantForm from './ParticipantForm';
import useParticipants from '@/features/participants/hooks/useParticipants';

function AddParticipantModal({ projectId }) {
  const { addParticipant } = useParticipants(projectId);

  return (
    <Dialog.Root
      placement="center"
      motionPreset="slide-in-top">
      <Dialog.Trigger asChild>
        <Button variant="outline">Add member +</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content w="md">
            <Dialog.Header>
              <Dialog.Title fontSize="2xl">Add team member</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <ParticipantForm onSubmit={addParticipant} />
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

export default AddParticipantModal;
