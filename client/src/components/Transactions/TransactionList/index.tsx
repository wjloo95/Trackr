import React from 'react';
import { TransactionType } from '../../../utils/types';

type TransactionListProps = {
  transactions: TransactionType[];
};

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const transactionsMap = transactions.map((transaction) => (
    <div key={transaction._id}>
      <h1>{transaction.symbol}</h1>
      <p>{transaction.type}</p>
      <p>{transaction.shares}</p>
      <p>$ {transaction.price}</p>
    </div>
  ));

  return <div>{transactionsMap}</div>;
};
