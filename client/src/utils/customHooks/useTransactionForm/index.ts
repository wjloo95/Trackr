import { useState } from 'react';
import axios from 'axios';

import { displayError, displaySuccess } from '../../helpers/alert';
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
    try {
      event.preventDefault();

      if (!Number.isInteger(Number(formInputs.shares))) {
        throw new Error('You may only purchase whole shares');
      }
      setrequestMade(true);

      const currentDate = new Date();

      const updatedTransaction = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/${formInputs.type}/${userID}`,
        {
          date: currentDate,
          type: formInputs.type,
          symbol: priceData.symbol.toUpperCase(),
          shares: formInputs.shares,
          price: priceData.price,
        }
      );

      setCurrentBalance(updatedTransaction.data.cash);

      setrequestMade(false);

      // Display success toast
      const { shares, type } = formInputs;
      const { symbol, price } = priceData;
      const transaction = type === 'purchase' ? 'Purchase' : 'Sale';

      displaySuccess(
        `${transaction} Complete: ${shares} ${
          shares > 1 ? 'shares' : 'share'
        } of ${symbol.toUpperCase()} @ ${price}/share`
      );
    } catch (error) {
      if (
        error.message ===
        'You may only purchase whole shares. Please try again.'
      ) {
        displayError(error.message);
      } else {
        displayError(
          'There was an error with your transaction. Please try again later.'
        );
      }
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
    handleSubmit,
    handleInputChange,
    formInputs,
  };
};
