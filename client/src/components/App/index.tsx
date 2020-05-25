import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  NavBar,
  Home,
  Login,
  Register,
  Portfolio,
  Transactions,
  NotFound,
} from '../';
import { useTokenCheck } from '../../utils/customHooks/useTokenCheck';

export const App = () => {
  // Custom Hook to check if user is logged in and pass along that user information
  const { currentUser, isAuthenticated } = useTokenCheck();

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} />
      <Switch>
        <Route exact path="/">
          <Home isAuthenticated={isAuthenticated} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/portfolio">
          <Portfolio />
        </Route>
        <Route exact path="/transactions">
          <Transactions />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};
