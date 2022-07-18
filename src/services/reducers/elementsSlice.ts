import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { IElement, IIngredient, IStateConstructor } from './types';
import type { PayloadAction, PrepareAction } from '@reduxjs/toolkit';

const initialStateConstructor: IStateConstructor = {
  bun: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0,
  },
  elements: [],
  isElements: false,
};

const elementsSlice = createSlice({
  name: 'elements',
  initialState: initialStateConstructor,
  reducers: {
    postBun(state, action: PayloadAction<IIngredient>) {
      state.bun = action.payload;
      state.isElements = true;
    },
    postElement: {
      reducer: (state, action: PayloadAction<IElement>) => {
        state.elements = [...state.elements, action.payload];
      },
      prepare: (text: IIngredient) => {
        const uid = nanoid();
        return { payload: { uid, ...text } };
      },
    },
    deleteElement(state, action: PayloadAction<string>) {
      state.elements = state.elements.filter((element) => element.uid !== action.payload);
    },
    newOrderElements(state, action: PayloadAction<IElement[]>) {
      state.elements = action.payload;
    },
  },
});

export const elementsReducers = elementsSlice.reducer;
export const elementsActions = elementsSlice.actions;
