import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setuserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setuserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({ token: jwtToken, userId: id })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setuserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId);
    }

    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};
