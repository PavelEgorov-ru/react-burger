import { combineReducers } from 'redux';
import { 
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_ELEMENTS_CONSTRUCTOR,
  POST_BUN_CONSTRUCTOR,
  POST_ELEMENT_CONSTRUCTOR,
  OPEN_MODAL_INGREDIENT,
  CLOSE_MODAL_INGREDIENT,
} from '../actions/index'

const initialStateIgredients = {
  ingredients: [],
  isIngredients: false,
}

const initialStateConstructor = {
  bun: {},
  elements: [],
  isElements: false,
}

const initialStateIngredient = {
  ingredient: {},
  isOpenModal: false
}
const initialStateOrder = {}


const ingredients = (state = initialStateIgredients, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        isIngredients: true
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

const elements = (state = initialStateConstructor, action) => {
  switch(action.type) {    
    case GET_ELEMENTS_CONSTRUCTOR: {
      return {
        ...state      
      }
    }
    case POST_BUN_CONSTRUCTOR: {
      return {
        ...state,
        bun: action.payload,
        isElements: true,
      }
    }
    case POST_ELEMENT_CONSTRUCTOR: {
      return {
        ...state,
        elements: [...state.elements, {...action.payload}]
      }
    }
    default: {
      return state
    }
  }
}


const ingredient = (state = initialStateIngredient, action) => {
  // return null
  switch (action.type) {
    case OPEN_MODAL_INGREDIENT: {
      return {
        ...state,
        ingredient: action.payload,
        isOpenModal: true
      }
    }
    case CLOSE_MODAL_INGREDIENT: {
      return {
        ...state,
        ingredient: {},
        isOpenModal: false
      }
    }
    default: {
      return state
    }
  }
}

const order = (state = initialStateOrder, action) => {
  return null
}

export const rootReducer = combineReducers({
  ingredients,
  elements,
  ingredient,
  order
})

