import RegisterPage from '@/features/auth/pages/RegisterPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import LogoutPage from '@/features/auth/pages/LogoutPage';

const authRoutes = [
  { path: 'login', Component: LoginPage, handle: { title: 'Login' } },
  {
    path: 'register',
    Component: RegisterPage,
    handle: { title: 'Register' },
  },
  {
    path: 'logout',
    Component: LogoutPage,
    handle: { title: 'Logout' },
  },
];

export default authRoutes;
