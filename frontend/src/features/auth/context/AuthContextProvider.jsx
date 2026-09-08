import { useCallback, useState } from 'react';
import api from '@/utils/api/';
import AuthContext from './AuthContext';

function AuthProvider({ children }) {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loginError, setLoginError] = useState();
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [logoutError, setLogoutError] = useState();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState();
  const [registerError, setRegisterError] = useState();
  const [loadingRegister, setLoadingRegister] = useState(false);

  const login = useCallback(async (username, password) => {
    try {
      setLoginError(null);
      setLoadingLogin(true);
      const response = await api({
        path: '/auth/login',
        body: { username, password },
        method: 'POST',
      });

      setUser(response.data);
    } catch (error) {
      setUser(null);
      setLoginError(error.message);
      throw error;
    } finally {
      setLoadingLogin(false);
    }
  }, []);

  const register = useCallback(async (username, password) => {
    try {
      setRegisterError(null);
      setLoadingRegister(true);
      const response = await api({
        path: '/auth/register',
        body: { username, password },
        method: 'POST',
      });

      setUser(response.data);
    } catch (error) {
      setUser(null);
      setRegisterError(error.message);
      throw error;
    } finally {
      setLoadingRegister(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLogoutError(null);
      setLoadingLogout(true);
      await api({ path: '/auth/logout', method: 'POST' });

      setUser(null);
    } catch (error) {
      setUser(null);
      setLogoutError(error.message);
    } finally {
      setLoadingLogout(false);
    }
  }, []);

  const getActiveUser = useCallback(async () => {
    try {
      setAuthLoading(true);
      setAuthError(null);
      const response = await api({ path: '/me' });

      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loadingLogin,
        loginError,
        loadingLogout,
        logoutError,
        loadingRegister,
        registerError,
        getActiveUser,
        authLoading,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
