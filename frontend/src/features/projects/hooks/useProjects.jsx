import useProjectsStore from './useProjectsStore';

function useProjects() {
  const { projects, loading, error, createProject, fetchMyProjects } = useProjectsStore();

  return {
    projects,
    loading,
    error,
    createProject,
    fetchMyProjects,
  };
}

export default useProjects;
