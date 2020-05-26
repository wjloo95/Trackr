import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/home.css';

type HomeProps = {
  isAuthenticated: boolean;
};

export const Home = ({ isAuthenticated }: HomeProps) => {
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
  const componentToDisplay = isAuthenticated
    ? loggedInComponent
    : loggedOutComponent;
  return (
    <div className="card-container home-container">
      <h1 className="card-title">Welcome to Stonks!</h1>
      {componentToDisplay}
    </div>
  );
};
