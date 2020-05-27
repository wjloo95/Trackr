import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { TransactionType } from '../../../utils/types';

type TransactionListProps = {
  transactions: TransactionType[] | null;
};

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const transactionsMap = transactions ? (
    transactions.length === 0 ? (
      <div className="empty-component-title">
        Navigate over to the Portfolio page to make your first transaction!
      </div>
    ) : (
      transactions.map((transaction) => (
        <div key={transaction._id} className="transactions-element">
          <p>
            {transaction.date.substr(0, 10)} |{' '}
            {transaction.type === 'purchase' ? 'BUY' : 'SELL'} (
            {transaction.symbol}) - {transaction.shares}{' '}
            {transaction.shares > 1 ? 'shares' : 'share'} @ $
            {transaction.price.toFixed(2)}
          </p>
        </div>
      ))
    )
  ) : (
    <Skeleton count={50} width="100%" height="100%" />
  );

  return <div className="transactions-list">{transactionsMap}</div>;
};
