import { Navigate } from 'react-router';
import ProjectPage from './pages/ProjectPage';

const projectRoutes = [
  {
    path: '/projects',
    children: [
      {
        index: true,
        element: (
          <Navigate
            to="/"
            replace
          />
        ),
      },
      {
        path: ':id',
        Component: ProjectPage,
        handle: { title: 'Project' },
      },
    ],
  },
];

export default projectRoutes;
