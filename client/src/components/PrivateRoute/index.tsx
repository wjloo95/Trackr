import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { StoreType } from '../../utils/types';

export const PrivateRoute = ({ component }: any) => {
  const currentUser = useSelector(
    (state: StoreType) => state.user,
    shallowEqual
  );
  if (currentUser) {
    return React.createElement(component);
  } else {
    return <Redirect to={{ pathname: '/login' }} />;
  }
};
