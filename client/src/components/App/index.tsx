import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';

import {
  NavBar,
  Home,
  Login,
  Register,
  Portfolio,
  Transactions,
  PublicRoute,
  PrivateRoute,
} from '../';
import { useTokenCheck } from '../../utils/customHooks/useTokenCheck';

export const App = () => {
  // Custom Hook to check if user is logged in and pass along that user information
  const didRequest = useTokenCheck();

  return (
    <>
      <NavBar />
      <ToastContainer autoClose={3000} position="top-center" />
      {!didRequest ? (
        <Skeleton width="100%" height="100vh" />
      ) : (
        <div className="app-body">
          <Switch>
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/register" component={Register} />
            <PrivateRoute exact path="/portfolio" component={Portfolio} />
            <PrivateRoute exact path="/transactions" component={Transactions} />
            <Route path="/">
              <Home />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      )}
    </>
  );
};
