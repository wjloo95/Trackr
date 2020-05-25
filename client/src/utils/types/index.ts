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
