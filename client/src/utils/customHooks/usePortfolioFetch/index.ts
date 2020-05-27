import { useState, useEffect } from 'react';
import axios from 'axios';
import { PortfolioEntryType } from '../../types';
import { displayError } from '../../helpers/alert';
import { fetchBatchIEX } from '../../helpers/api';

const constructIEXQuery = async (userID: string | null) => {
  // Retrieve this user's portfolio
  const currentPortfolio = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/portfolio/${userID}`
  );
  // Construct string from symbols to query IEX API
  const symbolsArr = Object.keys(currentPortfolio.data.portfolio);

  const symbolString = symbolsArr.reduce((acc, symbol, index, arr) => {
    return index === arr.length - 1 ? acc + symbol : acc + symbol + ',';
  }, '');

  return { currentPortfolio, symbolString };
};

const constructResults = async (
  symbolString: string,
  currentPortfolio: any
) => {
  // Return requisite data for each portfolio stock
  const stockResults = await fetchBatchIEX(symbolString);

  // Sum up the value of all the portfolio's stocks
  const totalPortfolioValue = Object.keys(stockResults).reduce(
    (acc, symbol) => {
      const shares = currentPortfolio.data.portfolio[symbol];
      const price = stockResults[symbol].quote.latestPrice;

      return acc + shares * price;
    },
    0
  );

  // Clean IEX data to only return what we need
  const cleanedStockResults = Object.keys(stockResults).map((symbol) => ({
    symbol,
    latestPrice: stockResults[symbol].quote.latestPrice,
    change: stockResults[symbol].quote.change,
    shares: currentPortfolio.data.portfolio[symbol],
  }));

  return { totalPortfolioValue, cleanedStockResults };
};

export const usePortfolioFetch = (
  userID: string | null,
  setCurrentBalance: (input: number) => void,
  setPortfolioValue: (input: number) => void
) => {
  const [response, setResponse] = useState<PortfolioEntryType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve this user's cash balance
        const currentCash = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/balance/${userID}`
        );

        setCurrentBalance(currentCash.data.cash);

        // Retrieve current portfolio to create string for IEX Query
        const { currentPortfolio, symbolString } = await constructIEXQuery(
          userID
        );

        // If user has no stocks, return empty array
        if (!symbolString) {
          setResponse([]);
          return;
        }

        // Use constructed IEX Query to get data for all stocks, and return requisite information
        const {
          totalPortfolioValue,
          cleanedStockResults,
        } = await constructResults(symbolString, currentPortfolio);

        setPortfolioValue(totalPortfolioValue);

        setResponse(cleanedStockResults);
      } catch (error) {
        displayError(
          'There was an error retrieving portfolio data. Please try again later.'
        );
      }
    };
    fetchData();
  }, [userID, setCurrentBalance, setPortfolioValue]);
  return response;
};
