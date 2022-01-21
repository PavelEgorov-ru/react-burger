import newApi from '../../utils/api'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    newApi.getIdegrients().
    then((ingredientsData) => {
      console.dir(ingredientsData)
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