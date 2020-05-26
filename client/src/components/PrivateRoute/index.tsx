import React from 'react';
import { Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  component,
  isAuthenticated,
  currentUser,
  ...rest
}: any) => {
  if (isAuthenticated) {
    return React.createElement(component, { currentUser });
  } else {
    return <Redirect to={{ pathname: '/login' }} />;
  }
};
