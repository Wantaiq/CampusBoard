import JoiBase from '@/utils/joi';
import {
  Form,
  Input,
  Textarea,
  Calendar,
  Select,
  Combobox,
} from '@/components/Form';
import { Button, Stack } from '@chakra-ui/react';
import ErrorMessage from '@/components/ErrorMessage';
import SuccessMessage from '@/components/SuccessMessage';
import { useState } from 'react';

function TaskForm({ onSubmit, participants, defaultValues = {} }) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const participantsSearchList = participants.map((participant) => {
    return {
      label: participant.username,
      value: participant.user_id,
    };
  });

  const handleSubmit = async ({
    name,
    description,
    status,
    dueDate,
    assigneeId,
  }) => {
    try {
      setProcessing(true);
      setError('');
      await onSubmit({ name, description, status, dueDate, assigneeId });
      setSuccessMessage('Success!');
    } catch (error) {
      setError(error.message);
    } finally {
      setProcessing(false);
    }
  };

  const today = new Date();
  today.setDate(today.getDate() + 1);

  const schema = JoiBase.object({
    name: JoiBase.string().trim().min(3).required().label('Task name'),
    description: JoiBase.string()
      .trim()
      .min(3)
      .required()
      .label('Task description'),
    dueDate: JoiBase.date().iso().required().label('Due date'),
    assigneeId: JoiBase.number()
      .integer()
      .positive()
      .required()
      .label('Assignee is required'),
    status: JoiBase.string()
      .trim()
      .valid('To Do', 'In Progress', 'Done')
      .label('Status'),
  });

  const statuses = [
    { label: 'To Do', value: 'To Do' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Done', value: 'Done' },
  ];

  return (
    <Form
      onSubmit={handleSubmit}
      schema={schema}
      defaultValues={defaultValues}>
      <Stack
        gap="4"
        w="full">
        <Input
          name="name"
          label="Name of task"
        />
        <Textarea
          name="description"
          label="What is task about?"
        />
        <Calendar
          name="dueDate"
          label="Due date"
        />
        <Select
          items={statuses}
          name="status"
          label="Current status of task"
          placeholder="Select status"
        />
        <Combobox
          label="Select assignee"
          name="assigneeId"
          items={participantsSearchList}
        />
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

export default TaskForm;
