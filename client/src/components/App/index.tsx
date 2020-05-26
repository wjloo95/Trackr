import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { NavBar, Home, Login, Register, Portfolio, Transactions } from '../';
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
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/portfolio">
          {isAuthenticated ? (
            <Portfolio currentUser={currentUser} />
          ) : (
            <Login />
          )}
        </Route>
        <Route exact path="/transactions">
          {isAuthenticated ? (
            <Transactions currentUser={currentUser} />
          ) : (
            <Login />
          )}
        </Route>
        <Route>
          <Home isAuthenticated={isAuthenticated} />
        </Route>
      </Switch>
    </>
  );
};
