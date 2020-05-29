import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { StoreType } from '../../utils/types';

export const PublicRoute = ({ component }: any) => {
  const currentUser = useSelector(
    (state: StoreType) => state.user,
    shallowEqual
  );
  if (currentUser) {
    return <Redirect to={{ pathname: '/' }} />;
  } else {
    return React.createElement(component);
  }
};
