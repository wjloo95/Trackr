import React from 'react';
import { usePortfolioFetch } from '../../../utils/customHooks/usePortfolioFetch';
import { PortfolioEntryType } from '../../../utils/types';

type PortfolioListProps = {
  userID: string | null;
};

export const PortfolioList = ({ userID }: PortfolioListProps) => {
  const portfolio = usePortfolioFetch(userID);

  const emptyPortfolioComponent = portfolio ? null : (
    <div>
      Use the form on the right to get started and add to your portfolio!
    </div>
  );

  const portfolioListComponent = portfolio
    ? portfolio.map(
        (
          {
            symbol,
            name,
            latestPrice,
            change,
            open,
            shares,
          }: PortfolioEntryType,
          index: number
        ) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '20px',
              color: change > 0 ? 'green' : 'red',
            }}
          >
            <h1>
              {symbol} | {name}
            </h1>
            <h4>{shares}</h4>
            <h4>{latestPrice}</h4>
          </div>
        )
      )
    : null;

  return (
    <div>
      {emptyPortfolioComponent}
      {portfolioListComponent}
    </div>
  );
};
