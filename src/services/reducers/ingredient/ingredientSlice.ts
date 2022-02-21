import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { IIngredient, IStateIngredient } from "./types";

const initialStateIngredient: IStateIngredient = {
  ingredient: {},
  isOpenModal: false,
};

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: initialStateIngredient,
  reducers: {
    openModal(state, { payload }: PayloadAction<IIngredient>) {
      state.ingredient = payload;
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
