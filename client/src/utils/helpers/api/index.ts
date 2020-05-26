const iexType = process.env.NODE_ENV === 'production' ? 'cloud' : 'sandbox';

const iexAuth =
  iexType === 'cloud'
    ? process.env.REACT_APP_IEX_TOKEN
    : process.env.REACT_APP_IEX_TEST;

export const fetchBatchIEX = async (symbols: string) => {
  const fetchIEXUrl = `https://${iexType}.iexapis.com/stable/stock/market/batch?types=quote&symbols=${symbols}&token=${iexAuth}`;

  return await fetch(fetchIEXUrl).then((res) => res.json());
};
export const fetchSingleIEX = async (symbol: string) => {
  const fetchIEXUrl = `https://${iexType}.iexapis.com/stable/stock/${symbol}/quote?token=${iexAuth}`;
  return await fetch(fetchIEXUrl).then((res) => res.json());
};
