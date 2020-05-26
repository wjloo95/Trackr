import React, { useState } from 'react';
import { UserType } from '../../utils/types';
import { PortfolioList } from './PortfolioList';
import { TransactionForm } from './TransactionForm';

type PortfolioProps = {
  currentUser: UserType | null;
};

export const Portfolio = ({ currentUser }: PortfolioProps) => {
  const [requestMade, setRequestMade] = useState(false);
  return requestMade ? (
    <div>PROCESSING YOUR PURCHASE</div>
  ) : (
    <div>
      Portfolio
      <div>
        <PortfolioList userID={currentUser ? currentUser.id : null} />
        <TransactionForm
          setRequestMade={setRequestMade}
          userID={currentUser ? currentUser.id : null}
        />
      </div>
    </div>
  );
};
