const tasksInitialState = {
  tasks: [],
  loading: true,
  error: null,
};

function tasksReducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'LOADED':
      return {
        ...state,
        loading: false,
        tasks: action.payload,
        error: null,
      };

    case 'TASK_CREATED':
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload],
        error: null,
      };

    case 'TASK_DELETED':
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        error: null,
      };

    case 'TASK_UPDATED':
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
        error: null,
      };

    case 'TASKS_ERROR':
      return {
        ...state,
        tasks: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export { tasksInitialState, tasksReducer };
