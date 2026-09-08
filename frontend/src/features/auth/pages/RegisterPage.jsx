import useAuth from '../hooks/useAuth';
import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router';
import { AbsoluteCenter } from '@chakra-ui/react';

function RegisterPage() {
  const { register, loadingRegister, registerError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async ({ username, password }) => {
    try {
      await register(username, password);
      navigate('/', {
        state: { newUser: true },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AbsoluteCenter>
      <RegisterForm
        handleSubmit={handleSubmit}
        processing={loadingRegister}
        error={registerError}
      />
    </AbsoluteCenter>
  );
}

export default RegisterPage;
