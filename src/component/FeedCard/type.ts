export type TProps = {
  ingredients: IIngredient[];
  createdAt: string;
  status: string;
  name: string;
  number: number;
};

interface IIngredient {
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
