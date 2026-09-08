import { Box, Card, Flex, Separator, Skeleton, Text } from '@chakra-ui/react';
import TaskCard from './TaskCard';
import CreateTaskModal from './CreateTaskModal';
import useTasks from '../hooks/useTasks';
import useParticipants from '@/features/participants/hooks/useParticipants';
import { useEffect } from 'react';
import ErrorMessage from '@/components/ErrorMessage';

function TasksSection({ projectId }) {
  const { tasks, fetchTasks, loading, error } = useTasks(projectId);
  const { participants } = useParticipants(projectId);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) {
    return (
      <Skeleton
        variant="shine"
        w={{ md: '4xl', base: 'xs' }}
        h="3xs"
        aspectRatio="unset"
        borderRadius="md"
      />
    );
  }

  if (error) {
    return (
      <Card.Root w={{ md: '4xl', base: 'xs' }}>
        <Card.Header as="h2">Tasks</Card.Header>
        <Card.Body>
          <Text fontWeight="bold">We could not load tasks</Text>
        </Card.Body>
        <Card.Footer>
          <ErrorMessage message={error} />
        </Card.Footer>
      </Card.Root>
    );
  }
  return (
    <Card.Root w={{ md: '4xl', base: 'xs' }}>
      <Card.Header>
        <Card.Title fontSize="lg" as="h2">
          Tasks
        </Card.Title>
      </Card.Header>
      {tasks.length ? (
        <Box as="ul">
          {tasks.map((task) => {
            return (
              <Box key={`task-${task.id}`} as="li">
                <Card.Body>
                  <TaskCard task={task} participants={participants} />
                </Card.Body>
                <Separator />
              </Box>
            );
          })}
        </Box>
      ) : (
        <Card.Body>
          <Flex flexDir="column" alignItems="start" gap="4">
            <Text>You don't have any tasks yet. </Text>
            <CreateTaskModal projectId={projectId} />
          </Flex>
        </Card.Body>
      )}
    </Card.Root>
  );
}

export default TasksSection;
