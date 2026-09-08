import useParticipantsStore from './useParticipantsStore';

function useParticipant(id) {
  const { participants, loading, error, removeParticipant } =
    useParticipantsStore();

  const participant = participants.find(
    (participant) => participant.user_id === parseInt(id),
  );

  return {
    participant,
    loading: loading,
    error: error,
    removeParticipant: () =>
      removeParticipant({
        projectId: participant.project_id,
        userId: participant.user_id,
      }),
  };
}

export default useParticipant;
