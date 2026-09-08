import { useState } from 'react';
import { Form, PdfUpload } from '@/components/Form';
import ErrorMessage from '@/components/ErrorMessage';
import SuccessMessage from '@/components/SuccessMessage';
import { Button, Stack } from '@chakra-ui/react';
import JoiBase from '@/utils/joi';

function ParticipantForm({ onSubmit }) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const schema = JoiBase.object({
    document: JoiBase.any().required(),
  });

  const handleSubmit = async ({ document }) => {
    try {
      setProcessing(true);
      setError('');
      await onSubmit({ document });
      setSuccessMessage('Success!');
    } catch (error) {
      setError(error.message);
    } finally {
      setProcessing(false);
    }
  };
  return (
    <Form
      onSubmit={handleSubmit}
      schema={schema}
      defaultValues={{ upload: null }}>
      <Stack
        gap="4"
        w="full">
        <PdfUpload name="document" />
        <Button
          fontWeight="bold"
          size="lg"
          type="submit"
          loading={processing}
          disabled={processing}>
          Submit
        </Button>
        <ErrorMessage message={error} />
        <SuccessMessage message={successMessage} />
      </Stack>
    </Form>
  );
}

export default ParticipantForm;
