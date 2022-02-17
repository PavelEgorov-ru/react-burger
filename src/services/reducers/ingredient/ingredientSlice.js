import { createSlice } from '@reduxjs/toolkit';

const initialStateIngredient = {
  ingredient: {},
  isOpenModal: false
}

const ingredientSlice  = createSlice({
  name: 'ingredient',
  initialState: initialStateIngredient,
  reducers: {
    openModal(state, action) {
      state.ingredient = action.payload
      state.isOpenModal = true
    },
    closeModal(state) {
      state.ingredient = {}
      state.isOpenModal = false
    }
  }
})

export const ingredientReducers = ingredientSlice.reducer;
export const ingredientActions = ingredientSlice.actions;