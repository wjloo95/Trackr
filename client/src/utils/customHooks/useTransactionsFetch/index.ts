import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTransactionsFetch = (userID: string | undefined) => {
  const [response, setResponse] = useState<any | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        process.env.REACT_APP_PUBLIC_URL + `/transactions/${userID}`
      );
      setResponse(response.data);
    };
    if (userID) {
      fetchData();
    }
  }, []);
  return response;
};
