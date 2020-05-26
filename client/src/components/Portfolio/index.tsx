import React, { useState } from 'react';
import { UserType } from '../../utils/types';
import { PortfolioList } from './PortfolioList';
import { TransactionForm } from './TransactionForm';

import './portfolio.css';

type PortfolioProps = {
  currentUser: UserType | null;
};

export const Portfolio = ({ currentUser }: PortfolioProps) => {
  const [requestMade, setRequestMade] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);
  return requestMade ? (
    <div>PROCESSING YOUR PURCHASE</div>
  ) : (
    <>
      <h1>Portfolio (${portfolioValue.toFixed(2)})</h1>
      <div className="portfolio-components">
        <PortfolioList
          userID={currentUser ? currentUser.id : null}
          setCurrentBalance={setCurrentBalance}
          setPortfolioValue={setPortfolioValue}
        />
        <TransactionForm
          setRequestMade={setRequestMade}
          userID={currentUser ? currentUser.id : null}
          currentBalance={currentBalance}
          setCurrentBalance={setCurrentBalance}
        />
      </div>
    </>
  );
};
