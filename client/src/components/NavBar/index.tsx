import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logout } from '../../utils/helpers/auth';
import { UserType } from '../../utils/types';

import '../../styles/navbar.css';

type NavProps = {
  isAuthenticated: boolean;
  currentUser: UserType | null;
  setCurrentUser: (input: UserType | null) => void;
  setIsAuthenticated: (input: boolean) => void;
};

export const NavBar = ({
  isAuthenticated,
  currentUser,
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
      <div className="nav-name">{currentUser ? currentUser.name : null}</div>
    </>
  );

  const navComponent = isAuthenticated ? loggedInNav : null;

  return (
    <div className="nav">
      <Link to="/home" className="home-link">
        Trackr
      </Link>
      {navComponent}
    </div>
  );
};
