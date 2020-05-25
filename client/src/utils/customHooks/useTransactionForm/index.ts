import { useState } from 'react';
import axios from 'axios';
import { TransactionFormType, StockPriceType } from '../../types';

export const useTransactionForm = (
  setrequestMade: (input: boolean) => void
) => {
  const [formInputs, setFormInputs] = useState<TransactionFormType>({
    symbol: '',
    type: '',
    shares: '',
  });
  const [priceData, setpriceData] = useState<StockPriceType>({
    name: '',
    price: 0,
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!Number.isInteger(Number(formInputs.shares))) {
      throw new Error('You may only purchase whole shares');
    }
    setrequestMade(true);

    const currentDate = new Date();

    axios
      .post(`/${formInputs.type}/5ec603faf3b5ec3c943bd2dd`, {
        date: currentDate,
        type: formInputs.type,
        symbol: formInputs.symbol.toUpperCase(),
        shares: Number(formInputs.shares),
        price: priceData.price,
      })
      .then(() => setrequestMade(false));
  };

  const checkIsValidSymbol = async (event: any) => {
    event.preventDefault();

    try {
      const stockResults = await fetch(
        `https://sandbox.iexapis.com/stable/stock/${formInputs.symbol}/quote?token=Tsk_943ee8f6637548f3828fcaef19d09bfd`
      ).then((res) => res.json());

      const { companyName, latestPrice } = stockResults;

      setpriceData({ name: companyName, price: latestPrice });
    } catch (error) {
      setpriceData({ name: 'invalid', price: 0 });
    }
  };

  const handleInputChange = (event: any) => {
    event.persist();
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    checkIsValidSymbol,
    handleSubmit,
    handleInputChange,
    priceData,
    formInputs,
  };
};