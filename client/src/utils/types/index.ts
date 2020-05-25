export type UserType = {
  id: string;
  name: string;
  cash: number;
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
