import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logout } from '../../utils/helpers/auth';
import { UserType } from '../../utils/types';

import './navbar.css';

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
      <NavLink
        to="/portfolio"
        className="nav-link"
        activeClassName="active-link"
      >
        Portfolio
      </NavLink>
      <NavLink
        to="/transactions"
        className="nav-link"
        activeClassName="active-link"
      >
        Transactions
      </NavLink>
      <div onClick={handleLogout} className="nav-link nav-button">
        Log Out
      </div>
    </>
  );

  const navComponent = isAuthenticated ? loggedInNav : null;

  return (
    <div className="nav">
      <Link to="/home" className="home-link">
        Stonks
      </Link>
      {navComponent}
    </div>
  );
};
