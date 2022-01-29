import { combineReducers } from 'redux';
import { 
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_ELEMENTS_CONSTRUCTOR,
  POST_BUN_CONSTRUCTOR,
  POST_ELEMENT_CONSTRUCTOR,
  DELETE_ELEMENT_CONSTRUCTOR,
  NEWORDER_ELEMENTS_CONSTRUCTOR,
  OPEN_MODAL_INGREDIENT,
  CLOSE_MODAL,
  POST_ORDERS_REQUEST,
  POST_ORDERS_SUCCESS,
  POST_ORDERS_FAILED
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
const initialStateOrder = {
  order: {},
  isOrder: false
}


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
    case DELETE_ELEMENT_CONSTRUCTOR: {
      return {
        ...state,
        elements: state.elements.filter((element) => {return element.uid !== action.payload})
      }
    }
    case NEWORDER_ELEMENTS_CONSTRUCTOR: {
      return {
        ...state,
        elements: action.payload
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
    case CLOSE_MODAL: {
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
  // return null
  switch (action.type) {
    case POST_ORDERS_REQUEST: {
      return {
        ...state,
        isOrder: false
      };
    }
    case POST_ORDERS_SUCCESS: {
      return {
        ...state,
        order: action.payload,
        isOrder: true
      };
    }
    case POST_ORDERS_FAILED: {
      return { 
        ...state
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        order: {},
        isOrder: false
      }
    }
    default: {
      return state
    }
  }
}

export const rootReducer = combineReducers({
  ingredients,
  elements,
  ingredient,
  order
})

