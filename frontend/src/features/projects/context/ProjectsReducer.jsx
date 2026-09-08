const projectsInitialState = {
  projects: [],
  loading: false,
  error: null,
};

function projectsReducer(state, action) {
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
        projects: action.payload,
        error: null,
      };

    case 'PROJECT_CREATED':
      return {
        ...state,
        loading: false,
        projects: [...state.projects, action.payload],
        error: null,
      };

    case 'PROJECT_DELETED':
      return {
        ...state,
        loading: false,
        projects: state.projects.filter((project) => project.id !== action.payload),
        error: null,
      };

    case 'PROJECTS_ERROR':
      return {
        ...state,
        projects: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export { projectsInitialState, projectsReducer };
