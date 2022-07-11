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

export type TResponseIngredients = {
  data: IIngredient[];
  success: boolean;
};
