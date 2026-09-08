import useAuth from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router';
import { AbsoluteCenter } from '@chakra-ui/react';

function LoginPage() {
  const { login, loadingLogin, loginError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async ({ username, password }) => {
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AbsoluteCenter>
      <LoginForm handleSubmit={handleSubmit} processing={loadingLogin} error={loginError} />
    </AbsoluteCenter>
  );
}

export default LoginPage;
