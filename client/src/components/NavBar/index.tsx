import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../utils/helpers/auth';

type NavProps = {
  isAuthenticated: boolean;
};

export const NavBar = ({ isAuthenticated }: NavProps) => {
  const loggedInNav = (
    <>
      <Link to="/portfolio">Portfolio</Link>
      <Link to="/transactions">Transactions</Link>
      <button onClick={logout}>Log Out</button>
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
