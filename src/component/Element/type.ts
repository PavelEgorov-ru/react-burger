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

export interface IElement extends IIngredient {
  uid: string;
}

export type TProps = {
  element: IElement;
  moveCard: (T: number, R: number) => void;
  index: number;
};
