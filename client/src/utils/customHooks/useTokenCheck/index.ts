import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import { UserType, TokenType } from '../../types';
import { logout, setAuthorizationToken } from '../../helpers/auth';
import { useLocation } from 'react-router-dom';

export const useTokenCheck = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const location = useLocation();
  useEffect(() => {
    if (localStorage.jwtToken) {
      const currentTime = new Date().getTime() / 1000;
      const token: TokenType = jwtDecode(localStorage.jwtToken);

      const user = { id: token.id, name: token.name };

      // Check if token has expired
      if (currentTime > token.exp) {
        // If so, remove from local storage
        setCurrentUser(logout());
        setIsAuthenticated(false);
      } else {
        setAuthorizationToken(localStorage.jwtToken);
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    }
  }, [location]);
  return { currentUser, setCurrentUser, isAuthenticated, setIsAuthenticated };
};
