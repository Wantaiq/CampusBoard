import { useState } from 'react';
import api from '@/utils/api/';

function useUsers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [users, setUsers] = useState([]);

  const searchByUsernameFragment = async (usernameFragment) => {
    try {
      if (!usernameFragment.trim()) {
        setUsers([]);
      }
      setLoading(true);
      const response = await api({
        path: `/users?username=${encodeURIComponent(usernameFragment)}`,
      });

      setUsers(response.data);
      return response.data;
    } catch (error) {
      setUsers([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { searchByUsernameFragment, users, loading, error };
}

export default useUsers;
