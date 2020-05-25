import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import { UserType } from '../../types';
import { logout, setAuthorizationToken } from '../../helpers/auth';
import { useLocation } from 'react-router-dom';

export const useTokenCheck = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const location = useLocation();
  useEffect(() => {
    if (localStorage.jwtToken) {
      const currentTime = new Date().getTime() / 1000;
      const token: any = jwtDecode(localStorage.jwtToken);

      // Check if token has expired
      if (currentTime > token.exp) {
        // If so, remove from local storage
        setCurrentUser(logout());
        setIsAuthenticated(false);
      } else {
        setAuthorizationToken(localStorage.jwtToken);
        setCurrentUser(token);
        setIsAuthenticated(true);
        // dispatch(set_current_user(token.user));
      }
    }
  }, [location]);
  return { currentUser, isAuthenticated };
};
