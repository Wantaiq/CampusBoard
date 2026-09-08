import { useContext } from 'react';
import ProjectsContext from '../context/ProjectsContext';

function useProjectsStore() {
  const context = useContext(ProjectsContext);

  return context;
}

export default useProjectsStore;
