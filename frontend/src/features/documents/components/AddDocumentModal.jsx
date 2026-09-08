import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import DocumentForm from './DocumentForm';
import useDocuments from '../hooks/useDocuments';

function AddDocumentModal({ projectId }) {
  const { addDocument } = useDocuments(projectId);
  return (
    <Dialog.Root
      placement="center"
      motionPreset="slide-in-top">
      <Dialog.Trigger asChild>
        <Button variant="outline">Add document +</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title fontSize="2xl">Upload</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <DocumentForm onSubmit={addDocument} />
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

export default AddDocumentModal;
