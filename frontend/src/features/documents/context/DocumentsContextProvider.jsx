import { useCallback, useReducer } from 'react';
import { documentsInitialState, documentsReducer } from './documentsReducer';
import DocumentsContext from './DocumentsContext';
import api from '@/utils/api/';
import { useNavigate } from 'react-router';

function DocumentsContextProvider({ children }) {
  const [state, dispatch] = useReducer(documentsReducer, documentsInitialState);
  const navigate = useNavigate();

  const addDocument = async ({ projectId, document }) => {
    try {
      if (!projectId) return;
      const formData = new FormData();
      formData.append('document', document);

      const response = await api({
        path: `/projects/${projectId}/documents`,
        method: 'POST',
        options: {
          body: formData,
          headers: {},
        },
      });

      dispatch({ type: 'DOCUMENT_ADDED', payload: response.data });
    } catch (error) {
      if (error.statusCode === 401 || error.statusCode === 403) {
        navigate('/auth/logout');
      }
      throw error;
    }
  };

  const removeDocument = async ({ projectId, id }) => {
    try {
      if (!projectId || !id) return;
      await api({
        path: `/projects/${projectId}/documents/${id}`,
        method: 'DELETE',
      });

      dispatch({ type: 'DOCUMENT_REMOVED', payload: parseInt(id) });
    } catch (error) {
      if (error.statusCode === 401 || error.statusCode === 403) {
        navigate('/auth/logout');
      }
    }
  };

  async function viewDocument({ projectId, id }) {
    try {
      const response = await api({
        path: `/projects/${projectId}/documents/${id}`,
      });

      const url = URL.createObjectURL(response);

      const a = document.createElement('a');
      a.href = url;

      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      if (error.statusCode === 401 || error.statusCode === 403) {
        navigate('/auth/logout');
      }
    }
  }

  const fetchProjectDocuments = useCallback(
    async ({ projectId }) => {
      if (!projectId) return;
      try {
        dispatch({ type: 'LOADING' });
        const response = await api({
          path: `/projects/${projectId}/documents`,
        });

        dispatch({ type: 'LOADED', payload: response.data });
      } catch (error) {
        if (error.statusCode === 401 || error.statusCode === 403) {
          navigate('/auth/logout');
        }
        dispatch({ type: 'DOCUMENTS_ERROR', payload: error.message });
      }
    },
    [navigate],
  );

  return (
    <DocumentsContext.Provider
      value={{
        ...state,
        addDocument,
        removeDocument,
        viewDocument,
        fetchProjectDocuments,
      }}>
      {children}
    </DocumentsContext.Provider>
  );
}

export default DocumentsContextProvider;
