import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialStateConstructor = {
  bun: {},
  elements: [],
  isElements: false,
}

const elementsSlice = createSlice({
  name: 'elements',
  initialState: initialStateConstructor,
  reducers: {
    postBun(state, action) {    
      state.bun = action.payload
      state.isElements=true      
    },
    postElement: {
      reducer: (state, action) => {
        state.elements = [...state.elements, action.payload]
      },
      prepare: (text) => {
        const uid = nanoid()
        return { payload: { uid, ...text } }
      },
    },
    deleteElement(state, action) {
      state.elements = state.elements.filter((element) => element.uid !== action.payload)
    },
    newOrderElements(state, action) {
      state.elements = action.payload
    }
  }
})

export const elementsReducers = elementsSlice.reducer;
export const elementsActions = elementsSlice.actions