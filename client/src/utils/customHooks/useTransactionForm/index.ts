import { useState } from 'react';
import axios from 'axios';
import { TransactionFormType, StockPriceType } from '../../types';

export const useTransactionForm = (
  setrequestMade: (input: boolean) => void,
  setCurrentBalance: (input: number) => void,
  userID: string | null
) => {
  const [formInputs, setFormInputs] = useState<TransactionFormType>({
    symbol: '',
    type: '',
    shares: 0,
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
      .post(
        `${process.env.REACT_APP_PUBLIC_URL}/${formInputs.type}/${userID}`,
        {
          date: currentDate,
          type: formInputs.type,
          symbol: formInputs.symbol.toUpperCase(),
          shares: formInputs.shares,
          price: priceData.price,
        }
      )
      .then((res) => {
        setCurrentBalance(res.data.cash);
        setrequestMade(false);
      });
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
      [event.target.name]:
        event.target.name === 'shares'
          ? Number(event.target.value)
          : event.target.value,
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
