import { useState, useEffect } from 'react';
import axios from 'axios';
import { TransactionType } from '../../types';

type ResponseType = {
  transactions: TransactionType[];
};

export const useTransactionsFetch = (userID: string | undefined) => {
  const [response, setResponse] = useState<ResponseType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_PUBLIC_URL}/transactions/${userID}`
      );
      setResponse(response.data);
    };
    if (userID) {
      fetchData();
    }
  }, [userID]);
  return response;
};
