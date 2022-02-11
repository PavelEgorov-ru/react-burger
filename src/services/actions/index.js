import newApi from '../../utils/api';
import { v4 as uuidv4 } from 'uuid';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const POST_ORDERS_REQUEST = 'POST_ORDERS_REQUEST';
export const POST_ORDERS_SUCCESS = 'POST_ORDERS_SUCCESS';
export const POST_ORDERS_FAILED = 'POST_ORDERS_FAILED';
export const GET_ELEMENTS_CONSTRUCTOR = 'GET_ELEMENTS_CONSTRUCTOR';
export const POST_BUN_CONSTRUCTOR = 'POST_BUN_CONSTRUCTOR';
export const POST_ELEMENT_CONSTRUCTOR = 'POST_ELEMENT_CONSTRUCTOR';
export const DELETE_ELEMENT_CONSTRUCTOR = 'DELETE_ELEMENT_CONSTRUCTOR';
export const NEWORDER_ELEMENTS_CONSTRUCTOR = 'NEWORDER_ELEMENTS_CONSTRUCTOR'
export const OPEN_MODAL_INGREDIENT = 'OPEN_MODAL_INGREDIENT';
export const CLOSE_MODAL = 'CLOSE_MODAL_INGREDIENT'

// export function getIngredients() {
//   return function(dispatch) {
//     dispatch({
//       type: GET_INGREDIENTS_REQUEST
//     });
//     newApi.getIdegrients()
//     .then((ingredientsData) => {
//       dispatch({
//         type: GET_INGREDIENTS_SUCCESS,
//         payload: ingredientsData.data
//       });
//     })
//     .catch(() => {
//       dispatch({
//         type: GET_INGREDIENTS_FAILED
//       });
//     });
//   };
// }

export function postOrders(info) {
  return function(dispatch) {
    dispatch({
      type: POST_ORDERS_REQUEST
    });
    newApi.postOrders(info).
    then((ordersData) => {
      dispatch({
        type: POST_ORDERS_SUCCESS,
        payload: ordersData.order
      });
    })
    .catch(() => {
      dispatch({
        type: POST_ORDERS_FAILED
      });
    });
  };
}

export function getElementsConstructor() {
  return {
    type: GET_ELEMENTS_CONSTRUCTOR,
  }
}

export function postBunConstructor(element) {
  return {
    type: POST_BUN_CONSTRUCTOR,
    payload: element
  }
}

export function postElementConstructor(element) {
  element.uid = uuidv4()
  return {
    type: POST_ELEMENT_CONSTRUCTOR,
    payload: element
  }
}

export function deleteElementConstructor(elementUid) {
  return {
    type: DELETE_ELEMENT_CONSTRUCTOR,
    payload: elementUid
  }
}

export function getNewOrderElements(elements) {
  return {
    type: NEWORDER_ELEMENTS_CONSTRUCTOR,
    payload: elements
  }
}

export function openModalIngredient(element) {
  return {
    type: OPEN_MODAL_INGREDIENT,
    payload: element
  }  
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }  
}