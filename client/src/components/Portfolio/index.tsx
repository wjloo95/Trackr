import React, { useState } from 'react';
import { UserType } from '../../utils/types';
import { PortfolioList } from './PortfolioList';
import { TransactionForm } from './TransactionForm';

type PortfolioProps = {
  currentUser: UserType | null;
};

export const Portfolio = ({ currentUser }: PortfolioProps) => {
  const [requestMade, setRequestMade] = useState(false);
  return (
    <div>
      Portfolio
      <div>
        <PortfolioList />
        <TransactionForm setRequestMade={setRequestMade} />
      </div>
    </div>
  );
};
