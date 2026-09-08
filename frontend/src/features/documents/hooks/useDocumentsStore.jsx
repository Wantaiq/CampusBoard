import { useContext } from 'react';
import DocumentsContext from '../context/DocumentsContext';

function useDocumentsStore() {
  const context = useContext(DocumentsContext);

  return context;
}

export default useDocumentsStore;
