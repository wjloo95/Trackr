import React from 'react';
import { useTransactionForm } from '../../../utils/customHooks/useTransactionForm';

type TransactionFormProps = {
  setRequestMade: (input: boolean) => void;
};

export const TransactionForm = ({ setRequestMade }: TransactionFormProps) => {
  const {
    formInputs,
    priceData,
    checkIsValidSymbol,
    handleSubmit,
    handleInputChange,
  } = useTransactionForm(setRequestMade);
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
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                required
                onChange={handleInputChange}
                value={formInputs.shares}
              />
              <button type="submit">Buy</button>
            </>
          )
        ) : null}
      </div>
    </form>
  );
};
