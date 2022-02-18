import { createSlice, nanoid } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { IStateConstructor, IIngredient, IElement } from './types';

const initialStateConstructor: IStateConstructor = {
  bun: {},
  elements: [],
  isElements: false,
};

const elementsSlice = createSlice({
  name: 'elements',
  initialState: initialStateConstructor,
  reducers: {
    postBun(state, action) {
      state.bun = action.payload;
      state.isElements = true;
    },
    postElement: {
      reducer: (state, { payload }: PayloadAction<IElement>) => {
        state.elements.push(payload);
      },
      prepare: (ingredient: IIngredient) => {
        const uid = nanoid();
        return { payload: { uid, ...ingredient } };
      },
    },
    deleteElement(state, action) {
      state.elements = state.elements.filter(
        (element) => element.uid !== action.payload
      );
    },
    newOrderElements(state, action) {
      state.elements = action.payload;
    },
  },
});

export const elementsReducers = elementsSlice.reducer;
export const elementsActions = elementsSlice.actions;
