import { useState } from 'react';
import { StockPriceType } from '../../types';

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
      const stockResults = await fetch(
        `https://sandbox.iexapis.com/stable/stock/${symbolFormInputs.symbol}/quote?token=Tsk_943ee8f6637548f3828fcaef19d09bfd`
      ).then((res) => res.json());

      const { companyName, latestPrice } = stockResults;

      setpriceData({
        symbol: symbolFormInputs.symbol,
        name: companyName,
        price: latestPrice,
      });
    } catch (error) {
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
