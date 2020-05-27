import { useState } from 'react';
import { StockPriceType } from '../../types';
import { fetchSingleIEX } from '../../helpers/api';

export const useCheckSymbol = () => {
  const [symbolFormInputs, setFormInputs] = useState({
    symbol: '',
  });
  const [priceData, setpriceData] = useState<StockPriceType>({
    name: '',
    symbol: '',
    price: 0,
  });

  const handleSymbolSubmit = async (event: any) => {
    try {
      event.preventDefault();

      // Get pricing data for the chosen stock
      const stockResults = await fetchSingleIEX(symbolFormInputs.symbol);

      const { companyName, latestPrice } = stockResults;

      setpriceData({
        symbol: symbolFormInputs.symbol,
        name: companyName,
        price: latestPrice,
      });
    } catch (error) {
      // If ticker was invalid, send along incorrect ticker notification
      setpriceData((prev) => ({ ...prev, name: 'invalid' }));
    }
  };

  const handleSymbolChange = (event: any) => {
    event.persist();
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleSymbolSubmit,
    handleSymbolChange,
    priceData,
    symbolFormInputs,
  };
};
