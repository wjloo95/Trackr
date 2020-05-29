import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { TokenType } from '../../types';
import { logout, setAuthorizationToken } from '../../helpers/auth';
import { displayError } from '../../helpers/alert';
import { addUser } from '../../../actions';

export const useTokenCheck = () => {
  const dispatch = useDispatch();
  const [didRequest, setDidRequest] = useState(false);

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
          dispatch(addUser(logout()));
          setDidRequest(true);
        } else {
          // If not, update current user to stored user
          dispatch(addUser(user));
          setAuthorizationToken(localStorage.jwtToken);
          setDidRequest(true);
        }
      } catch (error) {
        displayError(
          'There was an error logging you in. Please try again later.'
        );

        // Notify App that an attempt to log in was made and there is no user in storage. Render logged out application.
        setDidRequest(true);
      }
    } else {
      // Notify App that an attempt to log in was made and there is no user in storage. Render logged out application.
      setDidRequest(true);
    }
  }, [dispatch, location]);

  return didRequest;
};
