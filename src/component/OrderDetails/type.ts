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
