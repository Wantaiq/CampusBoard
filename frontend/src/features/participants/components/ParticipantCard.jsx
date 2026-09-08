import { Badge, Box, Button, Flex, Text } from '@chakra-ui/react';
import useParticipant from '../hooks/useParticipant';

function ParticipantCard({ participant, role }) {
  const { removeParticipant } = useParticipant(participant.user_id);

  return (
    <Flex flexDir="column">
      <Flex mb="2" gap="2" justifyContent="space-between" alignItems="start">
        <Box>
          <Text>{participant.username}</Text>
        </Box>
        {role === 'owner' && participant.role !== 'owner' && (
          <Button colorPalette="red" size="xs" variant="subtle" onClick={() => removeParticipant()}>
            Remove
          </Button>
        )}
      </Flex>
      <Badge width="fit-content" size="md" fontWeight="bold" colorPalette="gray">
        Role: {participant.role}
      </Badge>
    </Flex>
  );
}

export default ParticipantCard;
