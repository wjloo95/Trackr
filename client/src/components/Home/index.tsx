import React from 'react';
import { Link } from 'react-router-dom';
type HomeProps = {
  isAuthenticated: boolean;
};
export const Home = ({ isAuthenticated }: HomeProps) => {
  const loggedOutComponent = (
    <div>
      Please log in to get started!
      <button>
        <Link to="/login">Log In</Link>
      </button>
    </div>
  );
  const loggedInComponent = (
    <div>
      Check out your current portfolio or recent transactions
      <button>
        <Link to="/portfolio">Portfolio</Link>
      </button>
      <button>
        <Link to="/transactions">Transactions</Link>
      </button>
    </div>
  );
  const componentToDisplay = isAuthenticated
    ? loggedInComponent
    : loggedOutComponent;
  return <div>Welcome to Stonks!{componentToDisplay}</div>;
};
