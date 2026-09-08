import useDocumentsStore from './useDocumentsStore';

function useDocument(id) {
  const { documents, removeDocument, viewDocument } = useDocumentsStore();

  const document = documents.find((document) => document.id === parseInt(id));

  return {
    document,
    removeDocument: () => removeDocument({ projectId: document.project_id, id }),
    viewDocument: () => {
      viewDocument({ projectId: document.project_id, id });
    },
  };
}

export default useDocument;
