import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

import '../../styles/home.css';
import { StoreType } from '../../utils/types';

export const Home = () => {
  const currentUser = useSelector(
    (state: StoreType) => state.user,
    shallowEqual
  );
  const loggedOutComponent = (
    <div className="home-content">
      <h3>Please log in to start tracking your stocks!</h3>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
  const loggedInComponent = (
    <div className="home-content">
      <h3>Check out your current portfolio or recent transactions!</h3>
      <div className="home-content-buttons">
        <Link to="/portfolio">
          <button>Portfolio</button>
        </Link>
        <Link to="/transactions">
          <button>Transactions</button>
        </Link>
      </div>
    </div>
  );
  const componentToDisplay = currentUser
    ? loggedInComponent
    : loggedOutComponent;
  return (
    <div className="card-container home-container">
      <h1 className="card-title">Welcome to Trackr!</h1>
      {componentToDisplay}
    </div>
  );
};
