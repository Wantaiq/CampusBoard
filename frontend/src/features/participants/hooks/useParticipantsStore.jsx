import { useContext } from 'react';
import ParticipantsContext from '../context/ParticipantsContext';

function useParticipantsStore() {
  const context = useContext(ParticipantsContext);

  return context;
}

export default useParticipantsStore;
