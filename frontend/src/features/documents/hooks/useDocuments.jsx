import { useCallback } from 'react';
import useDocumentsStore from './useDocumentsStore';

function useDocuments(projectId) {
  const { loading, error, addDocument, documents, fetchProjectDocuments } =
    useDocumentsStore();
  const fetchDocuments = useCallback(() => {
    fetchProjectDocuments({ projectId });
  }, [projectId, fetchProjectDocuments]);

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    addDocument: (data) => addDocument({ projectId, ...data }),
  };
}

export default useDocuments;
