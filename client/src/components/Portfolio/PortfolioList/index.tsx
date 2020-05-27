import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { FiTrendingUp, FiTrendingDown, FiBarChart2 } from 'react-icons/fi';

import { usePortfolioFetch } from '../../../utils/customHooks/usePortfolioFetch';
import { PortfolioEntryType } from '../../../utils/types';

type PortfolioListProps = {
  userID: string | null;
  setCurrentBalance: (input: number) => void;
  setPortfolioValue: (input: number) => void;
};

export const PortfolioList = ({
  userID,
  setCurrentBalance,
  setPortfolioValue,
}: PortfolioListProps) => {
  const portfolio = usePortfolioFetch(
    userID,
    setCurrentBalance,
    setPortfolioValue
  );
  console.log(portfolio);
  const noStocksComponent =
    Array.isArray(portfolio) && portfolio.length === 0 ? (
      <div className="empty-component-title">
        Use the form on the right to get started and buy your first stock!
      </div>
    ) : null;

  const portfolioListComponent = portfolio ? (
    portfolio.map(
      (
        { symbol, latestPrice, change, shares }: PortfolioEntryType,
        index: number
      ) => (
        <div
          key={index}
          style={{
            color:
              change > 0 ? 'forestgreen' : change === 0 ? 'grey' : 'firebrick',
          }}
          className="portfolio-element"
        >
          <p>
            {change > 0 ? (
              <FiTrendingUp />
            ) : change < 0 ? (
              <FiTrendingDown />
            ) : (
              <FiBarChart2 />
            )}{' '}
            {symbol}
            <span>
              {' '}
              - {shares} {shares > 1 ? 'shares' : 'share'}
            </span>
          </p>
          <p>${latestPrice.toFixed(2)}/share</p>
        </div>
      )
    )
  ) : (
    <Skeleton width="100%" height="100%" />
  );

  return (
    <div className="portfolio-list">
      {noStocksComponent}
      {portfolioListComponent}
    </div>
  );
};
