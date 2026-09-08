import useTasksStore from './useTasksStore';

function useTask(id) {
  const { loading, error, deleteTask, updateTask, tasks } = useTasksStore();

  const task = tasks.find((task) => task.id === parseInt(id));

  return {
    task,
    loading,
    error,
    deleteTask: () => deleteTask({ projectId: task.project_id, taskId: id }),
    updateTask: (data) =>
      updateTask({ taskId: id, projectId: task.project_id, ...data }),
  };
}

export default useTask;
