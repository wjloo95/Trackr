import React from 'react';
import { useTransactionsFetch } from '../../utils/customHooks/useTransactionsFetch';
import { TransactionList } from './TransactionList';

import '../../styles/transactions.css';

export const Transactions = () => {
  const response = useTransactionsFetch();

  const transactions = response ? response.transactions : null;

  return (
    <div className="transactions-container">
      <div className="page-title">Transactions</div>
      <TransactionList transactions={transactions} />
    </div>
  );
};
