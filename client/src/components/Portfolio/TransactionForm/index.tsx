import React from 'react';
import { useTransactionForm } from '../../../utils/customHooks/useTransactionForm';
import { useCheckSymbol } from '../../../utils/customHooks/useCheckSymbol';

type TransactionFormProps = {
  setRequestMade: (input: boolean) => void;
  userID: string | null;
  currentBalance: number;
  setCurrentBalance: (input: number) => void;
};

export const TransactionForm = ({
  setRequestMade,
  userID,
  currentBalance,
  setCurrentBalance,
}: TransactionFormProps) => {
  const {
    handleSymbolSubmit,
    handleSymbolChange,
    priceData,
    symbolFormInputs,
  } = useCheckSymbol();
  const {
    formInputs,

    handleSubmit,
    handleInputChange,
  } = useTransactionForm(setRequestMade, setCurrentBalance, userID, priceData);
  return (
    <div className="transaction-form-outer-container">
      <h1>Cash - ${currentBalance.toFixed(2)}</h1>
      <div className="transaction-form-inner-container">
        <form onSubmit={handleSymbolSubmit}>
          <h2>Enter a Ticker Symbol to get started!</h2>
          <div className="transaction-form-element">
            <label>Symbol</label>
            <input
              type="text"
              name="symbol"
              required
              onChange={handleSymbolChange}
              value={symbolFormInputs.symbol}
            />
          </div>
          <button type="submit" className="transaction-button">
            Check Price
          </button>
        </form>
        {priceData.name ? (
          priceData.name === 'invalid' ? (
            <div className="symbol-information invalid">
              This ticker is not valid. Please try again!
            </div>
          ) : (
            <>
              <div className="symbol-information valid">
                {priceData.name} | ${priceData.price}
              </div>
              <h2>Select a transaction type and number of shares</h2>
              <form onSubmit={handleSubmit}>
                <div className="transaction-form-element">
                  <label>Transaction</label>
                  <select
                    name="type"
                    required
                    onChange={handleInputChange}
                    value={formInputs.type}
                  >
                    <option value="purchase">Buy</option>
                    <option value="sale">Sell</option>
                  </select>
                </div>
                <div className="transaction-form-element">
                  <label>Shares</label>
                  <input
                    type="number"
                    name="shares"
                    min="1"
                    required
                    onChange={handleInputChange}
                    value={formInputs.shares}
                  />
                </div>
                <button type="submit" className="transaction-button">
                  Complete Transaction
                </button>
              </form>
            </>
          )
        ) : null}
      </div>
    </div>
  );
};
