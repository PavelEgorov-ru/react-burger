import { combineReducers } from 'redux';

const initialStateIgredients = []
const initialStateConstructor = []
const initialStateIngredient = {}
const initialStateOrder = {}

const ingredientsReducer = (state = initialStateIgredients, action) => {
  return null
}

const constructorReducer = (state = initialStateConstructor, action) => {
  return null
}

const igredientReducer = (state = initialStateIngredient, action) => {
  return null
}

const orderReducer = (state = initialStateOrder, action) => {
  return null
}

export const rootReducer = combineReducers({
  ingredientsReducer,
  constructorReducer,
  igredientReducer,
  orderReducer
})

