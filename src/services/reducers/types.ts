export interface IStateIgredients {
  ingredients: IIngredient[];
  isIngredients: boolean;
}

export interface IStateIgredient {
  ingredient: {};
  isOpenModal: boolean;
}

export interface IStateConstructor {
  bun: IIngredient;
  elements: IElement[];
  isElements: boolean;
}

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IElement extends IIngredient {
  uid: string;
}

type TIngredientId = {
  _id: string;
};

export interface IIngredientsId {
  ingredients: TIngredientId[];
}

export interface IOrderObj {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  owner: {
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
  };
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IOrderInfo {
  ingredients: IIngredient[];
  _id: string;
  owner: {
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
  };
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
}

export interface IResponseOrderSlise {
  name: string;
  order: IOrderInfo;
  success: boolean;
}

export interface IResponseOrderInfoSlice {
  success: boolean;
  orders: IOrderObj[];
}

export interface IResponseReject {
  success: boolean;
  message: string;
}

export interface IStateOrder {
  order: IOrderObj[];
  orderInfo: IOrderInfo;
  isOrder: boolean;
  isLoadingOrder: boolean;
}

export type TResponseIngredients = {
  data: IIngredient[];
  success: boolean;
};

// wsSlice

export interface IStateWs {
  isConect: boolean;
  isLoadingWs: boolean;
  success: boolean;
  orders: IOrderObj[];
  total: number | null;
  totalToday: number | null;
  error: string;
}

export interface IStateUser {
  isAuth: boolean;
  isLoader: boolean;
  isForgot: boolean;
  isReset: boolean;
  userName: string;
  userEmail: string;
  errorMessage: string;
}
// User

export interface IResponseRegister {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

export interface IResponseEditUser {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

export interface IResponseSuccess {
  message: string;
  success: true;
}

export interface IResponseCheckUser {
  accessToken: string;
  refreshToken: string;
  success: boolean;
}

export interface IResponsDataWs {
  success: boolean;
  orders: IOrderObj[];
  total: number;
  totalToday: number;
}
