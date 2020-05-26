import React from 'react';
import { useTransactionForm } from '../../../utils/customHooks/useTransactionForm';

type TransactionFormProps = {
  setRequestMade: (input: boolean) => void;
  userID: string | null;
};

export const TransactionForm = ({
  setRequestMade,
  userID,
}: TransactionFormProps) => {
  const {
    formInputs,
    priceData,
    checkIsValidSymbol,
    handleSubmit,
    handleInputChange,
  } = useTransactionForm(setRequestMade, userID);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Symbol</label>
        <input
          type="text"
          name="symbol"
          required
          onChange={handleInputChange}
          value={formInputs.symbol}
        />
        <button onClick={checkIsValidSymbol}>Check Price</button>
        {priceData.name ? (
          priceData.name === 'invalid' ? (
            <h1>This ticker is not valid. Please try again!</h1>
          ) : (
            <>
              <div>{priceData.name}</div>
              <div>{priceData.price}</div>
              <label>Transaction Type</label>
              <select
                name="type"
                required
                onChange={handleInputChange}
                value={formInputs.type}
              >
                <option value="purchase">Buy</option>
                <option value="sale">Sell</option>
              </select>
              <label>Shares</label>
              <input
                type="number"
                name="shares"
                required
                onChange={handleInputChange}
                value={formInputs.shares}
              />
              <button type="submit">Complete Transaction</button>
            </>
          )
        ) : null}
      </div>
    </form>
  );
};
