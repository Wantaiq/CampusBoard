import { useContext } from 'react';
import TasksContext from '../context/TasksContext';

function useTasksStore() {
  const context = useContext(TasksContext);

  return context;
}

export default useTasksStore;
