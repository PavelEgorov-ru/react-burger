import newApi from "../../../utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { IResponseIngredients, IStateIgredients } from "./types";
import type {PayloadAction} from "@reduxjs/toolkit"

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const response = await newApi.getIdegrients();
    return response.data
  }
);

const initialStateIgredients: IStateIgredients = {
  ingredients: [],
  isIngredients: false,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: initialStateIgredients,
  extraReducers: {
    "ingredients/fetchIngredients/pending": (state) => state,
    "ingredients/fetchIngredients/fulfilled": (state, action: PayloadAction<IResponseIngredients> ) => {
      state.ingredients = action.payload;
      state.isIngredients = true;
    },
    "ingredients/fetchIngredients/rejected": (state) => {
      state.isIngredients = false;
    },
  },
  reducers: {},
});

export const ingredientsReducers = ingredientsSlice.reducer;
export const ingredientsActions = ingredientsSlice.actions;
