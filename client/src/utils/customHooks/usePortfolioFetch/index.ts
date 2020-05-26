import { useState, useEffect } from 'react';
import axios from 'axios';
import { PortfolioEntryType } from '../../types';

export const usePortfolioFetch = (userID: string | null) => {
  const [response, setResponse] = useState<PortfolioEntryType[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      // Retrieve this user's portfolio
      const currentPortfolio = await axios.get(
        `${process.env.REACT_APP_PUBLIC_URL}/portfolio/${userID}`
      );

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

      // Clean IEX data to only return what we need
      const cleanedStockResults = Object.keys(stockResults).map((symbol) => ({
        symbol,
        name: stockResults[symbol].quote.companyName,
        latestPrice: stockResults[symbol].quote.latestPrice,
        change: stockResults[symbol].quote.change,
        open: stockResults[symbol].quote.open,
        shares: currentPortfolio.data.portfolio[symbol],
      }));

      setResponse(cleanedStockResults);
    };
    fetchData();
  }, [userID]);
  return response;
};
