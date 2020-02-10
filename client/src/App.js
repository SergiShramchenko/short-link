import React from 'react';
import { AuthContext } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { NavBar } from './components/NavBar';
import { Loader } from './components/Loader';
import 'materialize-css';

function App() {
  const { token, login, logout, useId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        useId,
        isAuthenticated
      }}
    >
      <Router>
        {isAuthenticated && <NavBar />}
        <div className='container'>{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
