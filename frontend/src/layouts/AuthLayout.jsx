import { AbsoluteCenter } from '@chakra-ui/react';
import Spinner from '@/components/Spinner';
import useAuth from '@/features/auth/hooks/useAuth';
import { Navigate, Outlet } from 'react-router';
import { useEffect } from 'react';

function AuthLayout() {
  const { user, getActiveUser, authLoading, authError } = useAuth();

  useEffect(() => {
    getActiveUser();
  }, [getActiveUser]);

  if (authLoading) {
    return (
      <AbsoluteCenter>
        <Spinner loading={authLoading} />
      </AbsoluteCenter>
    );
  }
  if (!user || authError) {
    return (
      <Navigate
        to="/auth/login"
        replace
      />
    );
  }

  return <Outlet />;
}

export default AuthLayout;
