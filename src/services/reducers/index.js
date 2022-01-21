import { combineReducers } from 'redux';
import { GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED } from '../actions/index'

const initialStateIgredients = {
  ingredients: [],
}
const initialStateConstructor = []
const initialStateIngredient = {}
const initialStateOrder = {}


const ingredientsReducer = (state = initialStateIgredients, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      console.log(action.payload)
      return {
        ingredients: action.payload
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state};
    }
    default: {
      return state
    }
}
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
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  igredient: igredientReducer,
  order: orderReducer
})

