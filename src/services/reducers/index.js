//редьюсеры
import { combineReducers } from 'redux';
import { ingredientsReducers } from './ingredientsSlice';
import { elementsReducers } from './elementsSlice';
import { ingredientReducers } from './ingredientSlice';
import { orderReducers } from './orderSlice';
import { userReducers } from './userSlice';
import { wsReducers } from './wsSlice';

//экшены
export { elementsActions } from './elementsSlice';
export { ingredientActions } from './ingredientSlice';
export { wsActions } from './wsSlice';
export { ingredientsActions, fetchIngredients } from './ingredientsSlice';
export { orderActions, fetchOrder, fetchOrderInfo } from './orderSlice';
export {
  userActions,
  fetchNewUser,
  fetchAuth,
  fetchCheckUser,
  fetchEditUser,
  fetchLogout,
  fetchForgotPassword,
  fetchResetPassword,
} from './userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducers,
  elements: elementsReducers,
  ingredient: ingredientReducers,
  order: orderReducers,
  user: userReducers,
  socket: wsReducers,
});
