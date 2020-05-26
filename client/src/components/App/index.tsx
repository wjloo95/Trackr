import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

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
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    setIsAuthenticated,
  } = useTokenCheck();

  return (
    <>
      <NavBar
        isAuthenticated={isAuthenticated}
        setCurrentUser={setCurrentUser}
        setIsAuthenticated={setIsAuthenticated}
      />
      <ToastContainer autoClose={3000} position="top-center" />
      <div className="app-body">
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={Login}
            isAuthenticated={isAuthenticated}
          />
          <PublicRoute
            exact
            path="/register"
            component={Register}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path="/portfolio"
            component={Portfolio}
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
          />
          <PrivateRoute
            exact
            path="/transactions"
            component={Transactions}
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
          />
          <Route path="/">
            <Home isAuthenticated={isAuthenticated} />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </>
  );
};
