const documentsInitialState = {
  documents: [],
  loading: true,
  error: null,
};

function documentsReducer(state, action) {
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
        documents: action.payload,
        error: null,
      };

    case 'DOCUMENT_ADDED':
      return {
        ...state,
        loading: false,
        documents: [...state.documents, action.payload],
        error: null,
      };

    case 'DOCUMENT_REMOVED':
      return {
        ...state,
        loading: false,
        documents: state.documents.filter(
          (document) => document.id !== action.payload,
        ),
        error: null,
      };

    case 'DOCUMENTS_ERROR':
      return {
        ...state,
        documents: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export { documentsInitialState, documentsReducer };
