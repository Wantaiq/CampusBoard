const participantsInitialState = {
  participants: [],
  loading: true,
  error: null,
};

function participantsReducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'LOADED':
      return {
        ...state,
        loading: false,
        participants: action.payload,
        error: null,
      };

    case 'PARTICIPANT_ADDED':
      return {
        ...state,
        loading: false,
        participants: [...state.participants, action.payload],
        error: null,
      };

    case 'PARTICIPANT_REMOVED':
      return {
        ...state,
        loading: false,
        participants: state.participants.filter(
          (participant) => participant.user_id !== action.payload,
        ),
        error: null,
      };

    case 'PARTICIPANTS_ERROR':
      return {
        ...state,
        participants: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export { participantsInitialState, participantsReducer };
