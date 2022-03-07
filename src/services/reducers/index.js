import { combineReducers } from 'redux';
import { ingredientsReducers } from './ingredientsSlice';
import { elementsReducers } from './elementsSlice';
import { ingredientReducers } from './ingredientSlice';
import { orderReducers } from  './orderSlice';
export { elementsActions } from './elementsSlice';
export { ingredientActions } from './ingredientSlice';
export { ingredientsActions} from './ingredientsSlice';
export { orderActions } from './orderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducers,
  elements: elementsReducers,
  ingredient: ingredientReducers,
  order: orderReducers,
})
