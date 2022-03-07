import { combineReducers } from 'redux';
import newApi from '../../utils/api';
import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { ingredientsReducers } from './ingredientsSlice';
import { elementsReducers } from './elementsSlice';
import { ingredientReducers } from './ingredientSlice';


const initialStateOrder = {
  order: {},
  isOrder: false
}

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (info) => {
    const response = await newApi.postOrders(info)
    return response.order
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialStateOrder,
  reducers: {
    closeModal(state) {
      state.order = {}
      state.isOrder = false
    }
  },
  extraReducers: {
    [fetchOrder.pending]: (state, action) => {
      console.log(action)
      state.isOrder = false
    } ,
    [fetchOrder.fulfilled]: (state, action) => {
      state.isOrder = true
      state.order = action.payload

    },
    [fetchOrder.rejected]: state => state 
  }
})



export const rootReducer = combineReducers({
  ingredients: ingredientsReducers,
  elements: elementsReducers,
  ingredient: ingredientReducers,
  order: orderSlice.reducer
})
