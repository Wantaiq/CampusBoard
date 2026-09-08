import { useCallback } from 'react';
import useTasksStore from './useTasksStore';

function useTasks(projectId) {
  const { tasks, fetchProjectTasks, loading, error, createTask } =
    useTasksStore();

  const fetchTasks = useCallback(() => {
    fetchProjectTasks({ projectId });
  }, [projectId, fetchProjectTasks]);

  return {
    tasks,
    fetchTasks,
    loading,
    error,
    createTask: (data) => createTask({ projectId, ...data }),
  };
}

export default useTasks;
