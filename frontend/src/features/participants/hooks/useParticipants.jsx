import useParticipantsStore from './useParticipantsStore';
import { useCallback } from 'react';

function useParticipants(projectId) {
  const { fetchProjectParticipants, participants, loading, error, addParticipant } =
    useParticipantsStore();

  const fetchParticipants = useCallback(() => {
    fetchProjectParticipants({ projectId });
  }, [fetchProjectParticipants, projectId]);

  return {
    participants: participants,
    loading: loading,
    error: error,
    fetchParticipants,
    addParticipant: (data) => addParticipant({ projectId, ...data }),
  };
}

export default useParticipants;
