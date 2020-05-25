import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../utils/helpers/auth';
import { UserType } from '../../utils/types';

type NavProps = {
  isAuthenticated: boolean;
  setCurrentUser: (input: UserType | null) => void;
  setIsAuthenticated: (input: boolean) => void;
};

export const NavBar = ({
  isAuthenticated,
  setCurrentUser,
  setIsAuthenticated,
}: NavProps) => {
  const history = useHistory();
  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
    history.push('/');
  };
  const loggedInNav = (
    <>
      <Link to="/portfolio">Portfolio</Link>
      <Link to="/transactions">Transactions</Link>
      <button onClick={handleLogout}>Log Out</button>
    </>
  );

  const loggedOutNav = (
    <button>
      <Link to="/login">Log In</Link>
    </button>
  );

  const navComponent = isAuthenticated ? loggedInNav : loggedOutNav;

  return <div>{navComponent}</div>;
};
