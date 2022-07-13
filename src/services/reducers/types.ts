export interface IStateIgredients {
  ingredients: IIngredient[];
  isIngredients: boolean;
}

export interface IStateIgredient {
  ingredient: {};
  isOpenModal: boolean;
}

export interface IStateConstructor {
  bun: Record<string, any> | IIngredient;
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
  ingredients: IIngredient[];
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

export interface IResponseOrderSlise {
  name: string;
  order: IOrderObj;
  success: boolean;
}

export interface IResponseOrderInfoSlice {
  success: boolean;
  orders: IIngredient[];
}

export interface IResponseReject {
  success: boolean;
  message: string;
}

export interface IStateOrder {
  order: Record<string, any> | IOrderObj;
  orders: IIngredient[];
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
  orders: [];
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
  userPassword: string;
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
