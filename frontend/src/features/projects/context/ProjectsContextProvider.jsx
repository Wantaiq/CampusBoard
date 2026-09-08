import { useReducer } from 'react';
import api from '@/utils/api';
import ProjectContext from './ProjectsContext';
import { useNavigate } from 'react-router';
import { projectsInitialState, projectsReducer } from './projectsReducer';
import { useCallback } from 'react';

function ProjectsProvider({ children }) {
  const [state, dispatch] = useReducer(projectsReducer, projectsInitialState);

  const navigate = useNavigate();

  const createProject = async ({ name, description }) => {
    try {
      const response = await api({
        path: '/projects',
        body: { name, description },
        method: 'POST',
      });
      dispatch({ type: 'PROJECT_CREATED', payload: response.data });
      navigate(`/projects/${response.data.id}`);
    } catch (error) {
      if (error.statusCode === 401 || error.statusCode === 403) {
        navigate('/auth/logout');
      }
      throw error;
    }
  };

  const fetchMyProjects = useCallback(async () => {
    try {
      dispatch({ type: 'LOADING' });
      const response = await api({
        path: '/me/projects',
      });

      dispatch({ type: 'LOADED', payload: response.data });
    } catch (error) {
      if (error.statusCode === 401 || error.statusCode === 403) {
        navigate('/auth/logout');
      }
      dispatch({ type: 'PROJECTS_ERROR', payload: error.message });
    }
  }, [navigate]);

  const deleteProject = async (id) => {
    try {
      await api({
        path: `/projects/${id}`,
        method: 'DELETE',
      });

      dispatch({ type: 'PROJECT_DELETED', payload: parseInt(id) });
    } catch (error) {
      if (error.statusCode === 401 || error.statusCode === 403) {
        navigate('/auth/logout', { replace: true });
      }
      dispatch({ type: 'PROJECTS_ERROR', payload: error.message });
      throw error;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        ...state,
        createProject,
        deleteProject,
        fetchMyProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectsProvider;
