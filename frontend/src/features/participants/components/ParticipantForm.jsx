import { useState } from 'react';
import { Form } from '@/components/Form';
import ErrorMessage from '@/components/ErrorMessage';
import SuccessMessage from '@/components/SuccessMessage';
import { Button, Stack } from '@chakra-ui/react';
import JoiBase from '@/utils/joi';
import UsersCombobox from '@/features/users/components/UsersCombobox';

function ParticipantForm({ onSubmit }) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const schema = JoiBase.object({
    userId: JoiBase.number().integer().positive().required().label('User ID'),
  });

  const handleSubmit = async ({ userId }) => {
    try {
      setProcessing(true);
      setError('');
      await onSubmit({ userId });
      setSuccessMessage('Success!');
    } catch (error) {
      setError(error.message);
    } finally {
      setProcessing(false);
    }
  };
  return (
    <Form onSubmit={handleSubmit} schema={schema}>
      <Stack gap="4" w="full">
        <UsersCombobox label="Select user" name="userId" />
        <Button
          fontWeight="bold"
          size="lg"
          type="submit"
          loading={processing}
          disabled={processing}
        >
          Submit
        </Button>
        <ErrorMessage message={error} />
        <SuccessMessage message={successMessage} />
      </Stack>
    </Form>
  );
}

export default ParticipantForm;
