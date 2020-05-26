import { useState, useEffect } from 'react';
import axios from 'axios';
import { PortfolioEntryType } from '../../types';
import { displayError } from '../../helpers/alert';

export const usePortfolioFetch = (
  userID: string | null,
  setCurrentBalance: (input: number) => void,
  setPortfolioValue: (input: number) => void
) => {
  const [response, setResponse] = useState<PortfolioEntryType[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve this user's portfolio
        const currentPortfolio = await axios.get(
          `${process.env.REACT_APP_PUBLIC_URL}/portfolio/${userID}`
        );

        // Retrieve this user's cash balance
        const currentCash = await axios.get(
          `${process.env.REACT_APP_PUBLIC_URL}/balance/${userID}`
        );

        setCurrentBalance(currentCash.data.cash);

        // Construct string from symbols to query IEX API
        const symbolsArr = Object.keys(currentPortfolio.data.portfolio);

        const symbolString = symbolsArr.reduce((acc, symbol, index, arr) => {
          return index === arr.length - 1 ? acc + symbol : acc + symbol + ',';
        }, '');

        if (!symbolString) {
          return;
        }

        // Return requisite data for each portfolio stock
        const stockResults = await fetch(
          `https://sandbox.iexapis.com/stable/stock/market/batch?types=quote&symbols=${symbolString}&token=Tsk_943ee8f6637548f3828fcaef19d09bfd`
        ).then((res) => res.json());

        // Sum up the value of all the portfolio's stocks
        const totalPortfolioValue = Object.keys(stockResults).reduce(
          (acc, symbol) => {
            const shares = currentPortfolio.data.portfolio[symbol];
            const price = stockResults[symbol].quote.latestPrice;

            return acc + shares * price;
          },
          0
        );

        setPortfolioValue(totalPortfolioValue);

        // Clean IEX data to only return what we need
        const cleanedStockResults = Object.keys(stockResults).map((symbol) => ({
          symbol,
          latestPrice: stockResults[symbol].quote.latestPrice,
          change: stockResults[symbol].quote.change,
          shares: currentPortfolio.data.portfolio[symbol],
        }));

        setResponse(cleanedStockResults);
      } catch (error) {
        displayError(
          'There was an error retrieving portfolio data. Please try again later.'
        );
      }
    };
    fetchData();
  }, [userID, setCurrentBalance]);
  return response;
};
