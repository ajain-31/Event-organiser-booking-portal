import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { createContext, useState, useEffect } from 'react';

import { LOGIN_SUCCESS } from 'api/users/queries';

const defaultState = {
  user: {},
  isAuth: false,
  logout: () => {},
};

export const AuthContext = createContext(defaultState);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const { loading, data, error } = useQuery(LOGIN_SUCCESS);

  useEffect(() => {
    if (!loading && data?.loginSuccess?.user !== undefined) {
      setIsAuth(true);
      setUser(data?.loginSuccess?.user);
    }
  }, [loading, data?.loginSuccess?.user]);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
    setUser(null);
  };

  const authContextValue = { isAuth, user, logout };
  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
