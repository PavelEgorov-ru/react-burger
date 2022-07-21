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
