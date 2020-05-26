import React from 'react';
import { UserType } from '../../utils/types';
import { useTransactionsFetch } from '../../utils/customHooks/useTransactionsFetch';
import { TransactionList } from './TransactionList';

import '../../styles/transactions.css';

type TransactionProps = {
  currentUser: UserType | null;
};

export const Transactions = ({ currentUser }: TransactionProps) => {
  const response = useTransactionsFetch(currentUser?.id);

  const transactions = response ? response.transactions : [];

  return (
    <div className="transactions-container">
      <div className="page-title">Transactions</div>
      <TransactionList transactions={transactions} />
    </div>
  );
};
