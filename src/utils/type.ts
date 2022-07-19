export type TApiConstructor = {
  baseUrl: string;
};

export type TPostOrdersInfo = {
  ingredients: string[];
};

export type TForgotPasswordInfo = {
  email: string;
};

export type TResetPasswordInfo = {
  password: string;
  token: string;
};
