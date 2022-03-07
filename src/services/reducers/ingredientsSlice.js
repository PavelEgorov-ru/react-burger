import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import newApi from '../../utils/api';

const initialStateIgredients = {
  ingredients: [],
  isIngredients: false,
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await newApi.getIdegrients()
    return response.data
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialStateIgredients,
  extraReducers: {
    [fetchIngredients.pending]: state => state ,
    [fetchIngredients.fulfilled]: (state, action) => {
      state.ingredients = action.payload;
      state.isIngredients = true;
    },
    [fetchIngredients.rejected]: (state) => {
      state.isIngredients = false;
    },
  }
});

export const ingredientsReducers = ingredientsSlice.reducer;
export const ingredientsActions = ingredientsSlice.actions;
