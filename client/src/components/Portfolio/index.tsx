import React, { useState } from 'react';

import Skeleton from 'react-loading-skeleton';

import { PortfolioList } from './PortfolioList';
import { TransactionForm } from './TransactionForm';

import '../../styles/portfolio.css';

export const Portfolio = () => {
  const [requestMade, setRequestMade] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);
  return requestMade ? (
    <Skeleton width="100%" height="100%" />
  ) : (
    <div className="portfolio-container">
      <div className="page-title">Portfolio (${portfolioValue.toFixed(2)})</div>
      <div className="portfolio-components">
        <PortfolioList
          setCurrentBalance={setCurrentBalance}
          setPortfolioValue={setPortfolioValue}
        />
        <TransactionForm
          setRequestMade={setRequestMade}
          currentBalance={currentBalance}
          setCurrentBalance={setCurrentBalance}
        />
      </div>
    </div>
  );
};
