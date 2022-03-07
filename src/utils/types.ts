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

// интерфейс элемента, который попадает в массив для конструктора
export interface IElement extends IIngredient {
  uid: string;
}

export interface IElementsConstructor {
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
  uid?: string;
}

type TIngredientId = {
  _id: string;
};

export interface IIngredientsId {
  ingredients: TIngredientId[];
}
