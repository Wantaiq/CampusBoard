import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';
import Spinner from '@/components/Spinner';
import { AbsoluteCenter } from '@chakra-ui/react';

function LogoutPage() {
  const { loadingLogout, logout } = useAuth();
  useEffect(() => {
    logout();
  }, [logout]);

  if (loadingLogout) {
    return (
      <AbsoluteCenter>
        <Spinner />
      </AbsoluteCenter>
    );
  }

  return <Navigate to="/auth/login" replace />;
}

export default LogoutPage;
