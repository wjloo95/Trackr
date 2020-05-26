import { useState } from 'react';
import axios from 'axios';
import { TransactionFormType, StockPriceType } from '../../types';

export const useTransactionForm = (
  setrequestMade: (input: boolean) => void,
  setCurrentBalance: (input: number) => void,
  userID: string | null,
  priceData: StockPriceType
) => {
  const [formInputs, setFormInputs] = useState<TransactionFormType>({
    type: 'purchase',
    shares: 1,
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
          symbol: priceData.symbol.toUpperCase(),
          shares: formInputs.shares,
          price: priceData.price,
        }
      )
      .then((res) => {
        setCurrentBalance(res.data.cash);
        setrequestMade(false);
      });
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
    handleSubmit,
    handleInputChange,

    formInputs,
  };
};
