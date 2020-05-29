import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logout } from '../../utils/helpers/auth';

import '../../styles/navbar.css';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addUser } from '../../actions';
import { StoreType } from '../../utils/types';

export const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: StoreType) => state.user,
    shallowEqual
  );
  const handleLogout = () => {
    dispatch(addUser(logout()));
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

  const navComponent = currentUser ? loggedInNav : null;

  return (
    <div className="nav">
      <Link to="/home" className="home-link">
        Trackr
      </Link>
      {navComponent}
    </div>
  );
};
