import useProjectsStore from './useProjectsStore';

function useProject(id) {
  const { projects, error, loading, deleteProject } = useProjectsStore();

  const project = projects.find((project) => project.id === parseInt(id));

  return {
    project,
    error: error,
    loading: loading,
    deleteProject: () => deleteProject(id),
  };
}

export default useProject;
