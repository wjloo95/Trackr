import React, { useState } from 'react';
import { UserType } from '../../utils/types';
import { PortfolioList } from './PortfolioList';
import { TransactionForm } from './TransactionForm';

type PortfolioProps = {
  currentUser: UserType | null;
};

export const Portfolio = ({ currentUser }: PortfolioProps) => {
  const [requestMade, setRequestMade] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  return requestMade ? (
    <div>PROCESSING YOUR PURCHASE</div>
  ) : (
    <div>
      Portfolio | Current Cash Balance: {currentBalance}
      <div>
        <PortfolioList
          userID={currentUser ? currentUser.id : null}
          setCurrentBalance={setCurrentBalance}
        />
        <TransactionForm
          setRequestMade={setRequestMade}
          userID={currentUser ? currentUser.id : null}
          setCurrentBalance={setCurrentBalance}
        />
      </div>
    </div>
  );
};
