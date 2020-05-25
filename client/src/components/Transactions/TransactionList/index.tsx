import React from 'react';
import { TransactionType } from '../../../utils/types';

type TransactionListProps = {
  transactions: TransactionType[];
};

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const transactionsMap = transactions.map((transaction) => (
    <div key={transaction._id}>
      <h1>{transaction.symbol}</h1>
      <h1>{transaction.shares}</h1>
      <h1>$ {transaction.price}</h1>
    </div>
  ));

  return <div>{transactionsMap}</div>;
};
