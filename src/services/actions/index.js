import newApi from '../../utils/api'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_ELEMENTS_CONSTRUCTOR = 'GET_ELEMENTS_CONSTRUCTOR';
export const POST_BUN_CONSTRUCTOR = 'POST_BUN_CONSTRUCTOR'
export const POST_ELEMENT_CONSTRUCTOR = 'POST_ELEMENT_CONSTRUCTOR'

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    newApi.getIdegrients().
    then((ingredientsData) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: ingredientsData.data
      });
    })
    .catch(() => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
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
  return {
    type: POST_ELEMENT_CONSTRUCTOR,
    payload: element
  }
}