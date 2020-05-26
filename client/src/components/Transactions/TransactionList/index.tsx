import React from 'react';
import { TransactionType } from '../../../utils/types';

type TransactionListProps = {
  transactions: TransactionType[];
};

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const transactionsMap = transactions.map((transaction) => (
    <div key={transaction._id} className="transactions-element">
      <p>
        {transaction.date.substr(0, 10)} |{' '}
        {transaction.type === 'purchase' ? 'BUY' : 'SELL'} ({transaction.symbol}
        ) - {transaction.shares} {transaction.shares > 1 ? 'shares' : 'share'} @
        ${transaction.price}
      </p>
    </div>
  ));

  return <div className="transactions-list">{transactionsMap}</div>;
};
