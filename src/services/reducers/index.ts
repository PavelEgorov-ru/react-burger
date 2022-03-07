import { combineReducers } from 'redux';
import { ingredientsReducers, ingredientsActions } from './ingredients/ingredientsSlice';
import { elementsReducers, elementsActions } from './elements/elementsSlice';
import { orderReducers, orderActions } from './order/orderSlice';
import { ingredientReducers, ingredientActions } from './ingredient/ingredientSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducers,
  elements: elementsReducers,
  ingredient: ingredientReducers,
  order: orderReducers,
});

export { rootReducer, ingredientsActions, elementsActions, orderActions, ingredientActions };
