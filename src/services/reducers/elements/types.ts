/* здесь интерфейс для начального стейта. Я так понимаю, он типизирует и стейт
который прилетает в редьюсер*/
export interface IStateConstructor {
  bun: Record<string, any> | IIngredient;
  elements: IElement[];
  isElements: boolean;
}

// интерфейс ингредиента, который прилетает для контсруктора, перед получением
// уникального  id
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
  uid?: string;
}

// интерфейс элемента, который попадает в массив для конструктора
export interface IElement extends IIngredient {
  uid: string;
}
