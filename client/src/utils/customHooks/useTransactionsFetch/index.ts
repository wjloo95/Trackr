import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { TransactionType, StoreType } from '../../types';

type ResponseType = {
  transactions: TransactionType[];
};

export const useTransactionsFetch = () => {
  const currentUser = useSelector((state: StoreType) => state.user);
  const [response, setResponse] = useState<ResponseType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/transactions/${currentUser.id}`
      );
      setResponse(response.data);
    };
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);
  return response;
};
