import NotFoundPage from '@/pages/NotFoundPage';
import AuthLayout from '@/layouts/AuthLayout';
import AppLayout from '@/layouts/AppLayout';
import RootLayout from '@/layouts/RootLayout';
import authRoutes from '@/features/auth/routes';
import dashboardRoutes from '@/features/dashboard/routes';
import projectRoutes from '@/features/projects/routes';
import { Provider } from '@/components/Provider';
import AuthProvider from '@/features/auth/context/AuthContextProvider';
import ProjectsProvider from '@/features/projects/context/ProjectsContextProvider';
import ParticipantsProvider from '@/features/participants/context/ParticipantsContextProvider';
import TasksProvider from '@/features/tasks/context/TasksContextProvider';
import DocumentsProvider from '@/features/documents/context/DocumentsContextProvider';

const routes = [
  {
    element: (
      <Provider>
        <AuthProvider>
          <RootLayout />
        </AuthProvider>
      </Provider>
    ),
    children: [
      {
        path: '/',
        element: <AuthLayout />,
        handle: { requiresAuth: true },
        children: [
          {
            element: (
              <DocumentsProvider>
                <ParticipantsProvider>
                  <TasksProvider>
                    <ProjectsProvider>
                      <AppLayout />
                    </ProjectsProvider>
                  </TasksProvider>
                </ParticipantsProvider>
              </DocumentsProvider>
            ),
            children: [...dashboardRoutes, ...projectRoutes],
          },
        ],
      },
      {
        path: '/auth',
        children: authRoutes,
      },
      {
        path: '*',
        Component: NotFoundPage,
        handle: { title: 'Not Found' },
      },
    ],
  },
];

export default routes;
