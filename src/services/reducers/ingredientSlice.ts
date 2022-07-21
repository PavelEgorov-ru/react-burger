import { createSlice } from '@reduxjs/toolkit';
import type { IIngredient, IStateIgredient } from './types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialStateIngredient: IStateIgredient = {
  ingredient: {},
  isOpenModal: false,
};

const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState: initialStateIngredient,
  reducers: {
    openModal(state, action: PayloadAction<IIngredient>) {
      state.ingredient = action.payload;
      state.isOpenModal = true;
    },
    closeModal(state) {
      state.ingredient = {};
      state.isOpenModal = false;
    },
  },
});

export const ingredientReducers = ingredientSlice.reducer;
export const ingredientActions = ingredientSlice.actions;
