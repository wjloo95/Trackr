import React from 'react';
import { Link } from 'react-router-dom';

import './home.css';

type HomeProps = {
  isAuthenticated: boolean;
};

export const Home = ({ isAuthenticated }: HomeProps) => {
  const loggedOutComponent = (
    <div className="home-content">
      <h3>Please log in to start tracking your stocks!</h3>
      <button>
        <Link to="/login">Login</Link>
      </button>
    </div>
  );
  const loggedInComponent = (
    <div className="home-content">
      <h3>Check out your current portfolio or recent transactions!</h3>
      <div className="home-content-buttons">
        <button>
          <Link to="/portfolio">Portfolio</Link>
        </button>
        <button>
          <Link to="/transactions">Transactions</Link>
        </button>
      </div>
    </div>
  );
  const componentToDisplay = isAuthenticated
    ? loggedInComponent
    : loggedOutComponent;
  return (
    <div className="card-container home-container">
      <h1>Welcome to Stonks!</h1>
      {componentToDisplay}
    </div>
  );
};
