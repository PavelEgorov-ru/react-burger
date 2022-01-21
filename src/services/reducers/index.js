import { combineReducers } from 'redux';
import { 
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_ELEMENTS_CONSTRUCTOR,

} from '../actions/index'

const initialStateIgredients = {
  ingredients: [],
}
const initialStateConstructor = {
  elements: [],
}
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
      return {
        ...state,
        ingredients: action.payload
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { 
        ...state
      };
    }
    default: {
      return state
    }
  }
}

const constructorReducer = (state = initialStateConstructor, action) => {
  switch(action.type) {    
    case GET_ELEMENTS_CONSTRUCTOR: {
      return {
        ...state,
        elements: []
      }
    }
    default: {
      return state
    }
  }
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

