import { useCallback, useReducer } from 'react';
import ParticipantsContext from './ParticipantsContext';
import { participantsInitialState, participantsReducer } from './participantsReducer';
import api from '@/utils/api';
import { useNavigate } from 'react-router';

function ParticipantsProvider({ children }) {
  const [state, dispatch] = useReducer(participantsReducer, participantsInitialState);

  const navigate = useNavigate();

  const addParticipant = async ({ projectId, userId }) => {
    try {
      const response = await api({
        path: `/projects/${projectId}/participants`,
        body: { userId },
        method: 'POST',
      });

      dispatch({ type: 'PARTICIPANT_ADDED', payload: response.data });
    } catch (error) {
      if (error.statusCode === 401 || error.statusCode === 403) {
        navigate('/auth/logout');
      }
      throw error;
    }
  };

  const removeParticipant = async ({ projectId, userId }) => {
    try {
      if (!projectId || !userId) return;
      await api({
        path: `/projects/${projectId}/participants/${userId}`,
        method: 'DELETE',
      });

      dispatch({ type: 'PARTICIPANT_REMOVED', payload: parseInt(userId) });
    } catch (error) {
      if (error.statusCode === 401 || error.statusCode === 403) {
        navigate('/auth/logout');
      }
      dispatch({ type: 'PARTICIPANTS_ERROR', payload: error.message });
      throw error;
    }
  };

  const fetchProjectParticipants = useCallback(
    async ({ projectId }) => {
      if (!projectId) return;
      try {
        dispatch({ type: 'LOADING' });

        const response = await api({
          path: `/projects/${projectId}/participants`,
        });

        dispatch({ type: 'LOADED', payload: response.data });
      } catch (error) {
        if (error.statusCode === 401 || error.statusCode === 403) {
          navigate('/auth/logout');
        }
        dispatch({ type: 'PARTICIPANTS_ERROR', payload: error.message });
      }
    },
    [navigate],
  );

  return (
    <ParticipantsContext.Provider
      value={{
        ...state,
        fetchProjectParticipants,
        addParticipant,
        removeParticipant,
      }}
    >
      {children}
    </ParticipantsContext.Provider>
  );
}

export default ParticipantsProvider;
