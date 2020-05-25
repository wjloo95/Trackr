import React from 'react';
import { UserType } from '../../utils/types';
import { useTransactionsFetch } from '../../utils/customHooks/useTransactionsFetch';
import { TransactionList } from './TransactionList';

type TransactionProps = {
  currentUser: UserType | null;
};

export const Transactions = ({ currentUser }: TransactionProps) => {
  const response = useTransactionsFetch(currentUser?.id);

  const transactions = response ? response.transactions : [];

  return (
    <div>
      Here are your transactions!
      <TransactionList transactions={transactions} />
    </div>
  );
};
