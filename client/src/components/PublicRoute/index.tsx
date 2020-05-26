import React from 'react';
import { Redirect } from 'react-router-dom';

export const PublicRoute = ({ component, isAuthenticated, ...rest }: any) => {
  if (isAuthenticated) {
    return <Redirect to={{ pathname: '/' }} />;
  } else {
    return React.createElement(component);
  }
};
