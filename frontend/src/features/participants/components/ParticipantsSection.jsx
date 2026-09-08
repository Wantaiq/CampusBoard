import { Box, Card, Separator, Skeleton, Text } from '@chakra-ui/react';
import ParticipantCard from './ParticipantCard';
import useParticipants from '../hooks/useParticipants';
import { useEffect } from 'react';
import ErrorMessage from '@/components/ErrorMessage';

function ParticipantsSection({ role, projectId }) {
  const { participants, fetchParticipants, loading, error } = useParticipants(projectId);

  useEffect(() => {
    fetchParticipants();
  }, [projectId, fetchParticipants]);

  if (loading) {
    return <Skeleton variant="shine" w="100%" aspectRatio="wide" borderRadius="md" />;
  }

  if (error) {
    return (
      <Card.Root w="2xs">
        <Card.Header as="h2">Members</Card.Header>
        <Card.Body>
          <Text fontWeight="bold">We could not load members</Text>
        </Card.Body>
        <Card.Footer>
          <ErrorMessage message={error} />
        </Card.Footer>
      </Card.Root>
    );
  }

  return (
    <Card.Root w="2xs">
      <Card.Header pb="0">
        <Card.Title fontSize="lg" as="h2">
          Members
        </Card.Title>
      </Card.Header>
      {participants.length ? (
        <Box as="ul">
          {participants.map((participant) => (
            <Box key={`participant-${participant.user_id}`} as="li">
              <Card.Body>
                <ParticipantCard role={role} participant={participant} />
              </Card.Body>
              <Separator />
            </Box>
          ))}
        </Box>
      ) : (
        <Card.Body>
          <Text>There are no participants of this project</Text>
        </Card.Body>
      )}
    </Card.Root>
  );
}

export default ParticipantsSection;
