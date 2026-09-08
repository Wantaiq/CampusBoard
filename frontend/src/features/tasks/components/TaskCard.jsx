import { Badge, Box, Button, Flex, Text } from '@chakra-ui/react';
import UpdateTaskModal from './UpdateTaskModal';
import useTask from '../hooks/useTask';

function DeadlineBadge({ deadline, status }) {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const formattedDate = deadlineDate.toLocaleDateString('de-AT');

  if (status === 'Done') {
    return (
      <Badge
        variant="solid"
        colorPalette="green"
        size="md">
        {formattedDate}
      </Badge>
    );
  }

  if (deadlineDate.getTime() <= today.getTime()) {
    return (
      <Badge
        variant="solid"
        colorPalette="red"
        size="md">
        {formattedDate}
      </Badge>
    );
  }

  if (deadlineDate.getTime() > today.getTime()) {
    return (
      <Badge
        colorPalette="yellow"
        variant="solid"
        size="md">
        {formattedDate}
      </Badge>
    );
  }
}

function StatusBadge({ status }) {
  if (status === 'To Do') {
    return (
      <Badge
        variant="solid"
        colorPalette="red"
        size="md">
        {status}
      </Badge>
    );
  }

  if (status === 'In Progress') {
    return (
      <Badge
        colorPalette="yellow"
        variant="solid"
        size="md">
        {status}
      </Badge>
    );
  }

  return (
    <Badge
      variant="solid"
      colorPalette="green"
      size="md">
      {status}
    </Badge>
  );
}

function TaskCard({ task, participants }) {
  const { deleteTask } = useTask(task.id);

  return (
    <Flex flexDir="column">
      <Flex
        mb="4"
        gap="2"
        justifyContent="space-between"
        alignItems="start">
        <Box pe="4">
          <Box maxW="2xl">
            <Text
              truncate
              fontSize="lg"
              fontWeight="semibold">
              {task.name}
            </Text>
          </Box>
          <Text
            color="fg.muted"
            textWrap="wrap">
            {task.description}
          </Text>
        </Box>
        <Flex gap="4">
          <UpdateTaskModal
            task={task}
            participants={participants}
          />
          <Button
            colorPalette="red"
            size="sm"
            variant="subtle"
            onClick={() => deleteTask()}>
            Delete
          </Button>
        </Flex>
      </Flex>
      <Flex
        gap={{ base: '4', md: '2' }}
        flexDir={{ base: 'column', md: 'row' }}
        justify={{ md: 'space-between' }}>
        <Flex gap="2">
          <DeadlineBadge
            deadline={task.deadline}
            status={task.status}
          />
          <StatusBadge status={task.status} />
        </Flex>
        <Badge
          w="fit-content"
          size="md"
          fontWeight="bold"
          colorPalette="purple">
          Assigned to @{task.assignee}
        </Badge>
      </Flex>
    </Flex>
  );
}

export default TaskCard;
