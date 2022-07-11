import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newApi from '../../utils/api';
import type { TResponseIngredients, IStateIgredients, IIngredient } from './types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialStateIgredients: IStateIgredients = {
  ingredients: [],
  isIngredients: false,
};

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  const response = await newApi.getIdegrients();
  const responseData: TResponseIngredients = await response.json();
  return responseData.data;
});

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialStateIgredients,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => state)
      .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<IIngredient[]>) => {
        state.ingredients = action.payload;
        state.isIngredients = true;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isIngredients = false;
      });
  },
});

export const ingredientsReducers = ingredientsSlice.reducer;
export const ingredientsActions = ingredientsSlice.actions;
