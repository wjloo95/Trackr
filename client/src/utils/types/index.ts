export type UserType = {
  id: string;
  name: string;
};

export type LoginFormType = {
  email: string;
  password: string;
};

export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
};

export type TokenType = {
  id: string;
  name: string;
  cash: number;
  iat: number;
  exp: number;
};

enum TransactionEnum {
  purchase = 'purchase',
  sale = 'sale',
}

export type TransactionType = {
  _id: string;
  date: string;
  type: TransactionEnum;
  symbol: string;
  shares: number;
  price: number;
};

export type TransactionFormType = {
  type: string;
  shares: number;
};

export type StockPriceType = {
  name: string;
  symbol: string;
  price: number;
};

export type PortfolioEntryType = {
  symbol: string;
  latestPrice: number;
  change: number;
  shares: number;
};
