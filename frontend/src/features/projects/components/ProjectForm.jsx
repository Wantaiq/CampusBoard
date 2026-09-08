import JoiBase from '@/utils/joi';
import { Form, Input } from '@/components/Form';
import { Button, Stack } from '@chakra-ui/react';
import ErrorMessage from '@/components/ErrorMessage';
import SuccessMessage from '@/components/SuccessMessage';
import Textarea from '@/components/Form/Textarea';
import { useState } from 'react';

function ProjectForm({ onCreate }) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async ({ name, description }) => {
    try {
      setProcessing(true);
      setError('');
      await onCreate({ name, description });
      setSuccessMessage('Success!');
    } catch (error) {
      setError(error.message);
    } finally {
      setProcessing(false);
    }
  };

  const schema = JoiBase.object({
    name: JoiBase.string().trim().min(3).required().label('Name'),
    description: JoiBase.string().trim().min(3).required().label('Project description'),
  });

  return (
    <Form onSubmit={handleSubmit} schema={schema}>
      <Stack gap="4" w="full">
        <Input name="name" label="Name of project" />
        <Textarea name="description" label="What is project about?" />
        <Button
          fontWeight="bold"
          size="lg"
          type="submit"
          loading={processing}
          disabled={processing}
        >
          Create
        </Button>
        <ErrorMessage message={error} />
        <SuccessMessage message={successMessage} />
      </Stack>
    </Form>
  );
}

export default ProjectForm;
