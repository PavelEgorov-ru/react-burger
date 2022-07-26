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

export type TLoginInfo = {
  email: string;
  password: string;
};

export type TRegisterInfo = {
  name: string;
  email: string;
  password: string;
};

export type TLogoutInfo = {
  token: string | null;
};

export type TNewTokenInfo = {
  token: string | null;
};

export type TEditUserInfo = {
  name: string | undefined;
  email: string | undefined;
  password?: string | undefined;
};
