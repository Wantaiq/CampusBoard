import { useCallback, useReducer } from 'react';
import { tasksInitialState, tasksReducer } from './tasksReducer';
import { useNavigate } from 'react-router';
import api from '@/utils/api';
import TasksContext from './TasksContext';

function TasksProvider({ children }) {
  const [state, dispatch] = useReducer(tasksReducer, tasksInitialState);

  const navigate = useNavigate();

  const createTask = async ({
    projectId,
    name,
    description,
    status,
    dueDate,
    assigneeId,
  }) => {
    if (!projectId) return;
    try {
      const response = await api({
        path: `/projects/${projectId}/tasks`,
        body: {
          name,
          description,
          status,
          dueDate,
          assigneeId,
        },
        method: 'POST',
      });
      dispatch({ type: 'TASK_CREATED', payload: response.data });
    } catch (error) {
      if (error.statusCode === 401 || error.statusCode === 403) {
        navigate('/auth/logout');
      }
      throw error;
    }
  };

  const deleteTask = async ({ projectId, taskId }) => {
    try {
      if (!projectId || !taskId) return;
      await api({
        path: `/projects/${projectId}/tasks/${taskId}`,
        method: 'DELETE',
      });

      dispatch({ type: 'TASK_DELETED', payload: parseInt(taskId) });
    } catch (error) {
      if (error.statusCode === 401 || error.statusCode === 403) {
        navigate('/auth/logout');
      }
    }
  };

  const updateTask = async ({
    taskId,
    projectId,
    name,
    description,
    status,
    dueDate,
    assigneeId,
  }) => {
    if (!projectId || !taskId) return;
    try {
      const response = await api({
        path: `/projects/${projectId}/tasks/${taskId}`,
        body: {
          name,
          description,
          status,
          dueDate,
          assigneeId,
        },
        method: 'PUT',
      });

      dispatch({ type: 'TASK_UPDATED', payload: response.data });
    } catch (error) {
      if (error.statusCode === 401 || error.statusCode === 403) {
        navigate('/auth/logout');
      }
      throw error;
    }
  };

  const fetchProjectTasks = useCallback(
    async ({ projectId }) => {
      if (!projectId) return;
      try {
        dispatch({ type: 'LOADING' });
        const response = await api({
          path: `/projects/${projectId}/tasks`,
        });

        dispatch({ type: 'LOADED', payload: response.data });
      } catch (error) {
        if (error.statusCode === 401 || error.statusCode === 403) {
          navigate('/auth/logout');
        }
        dispatch({ type: 'TASKS_ERROR', payload: error.message });
      }
    },
    [navigate],
  );

  return (
    <TasksContext.Provider
      value={{
        ...state,
        fetchProjectTasks,
        updateTask,
        deleteTask,
        createTask,
      }}>
      {children}
    </TasksContext.Provider>
  );
}

export default TasksProvider;
