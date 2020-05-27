import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import { UserType, TokenType } from '../../types';
import { logout, setAuthorizationToken } from '../../helpers/auth';
import { useLocation } from 'react-router-dom';
import { displayError } from '../../helpers/alert';

type UserDataType = {
  currentUser: UserType | null;
  isAuthenticated: boolean;
  didRequest: boolean;
};

export const useTokenCheck = () => {
  const [userData, setUserData] = useState<UserDataType>({
    currentUser: null,
    isAuthenticated: false,
    didRequest: false,
  });

  const setCurrentUser = (user: UserType | null) => {
    setUserData((prev) => ({ ...prev, currentUser: user }));
  };
  const setIsAuthenticated = (input: boolean) => {
    setUserData((prev) => ({ ...prev, isAuthenticated: input }));
  };

  const location = useLocation();
  useEffect(() => {
    if (localStorage.jwtToken) {
      try {
        const currentTime = new Date().getTime() / 1000;
        const token: TokenType = jwtDecode(localStorage.jwtToken);

        const user = { id: token.id, name: token.name };

        // Check if token has expired
        if (currentTime > token.exp) {
          // If so, remove from local storage
          setUserData({
            currentUser: logout(),
            isAuthenticated: false,
            didRequest: true,
          });
        } else {
          // If not, update current user to stored user
          setAuthorizationToken(localStorage.jwtToken);
          setUserData({
            currentUser: user,
            isAuthenticated: true,
            didRequest: true,
          });
        }
      } catch (error) {
        displayError(
          'There was an error logging you in. Please try again later.'
        );

        // Notify App that an attempt to log in was made and there is no user in storage. Render logged out application.
        setUserData((prev) => ({
          ...prev,
          didRequest: true,
        }));
      }
    } else {
      // Notify App that an attempt to log in was made and there is no user in storage. Render logged out application.
      setUserData((prev) => ({
        ...prev,
        didRequest: true,
      }));
    }
  }, [location]);

  const { currentUser, isAuthenticated, didRequest } = userData;
  return {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    setIsAuthenticated,
    didRequest,
  };
};
