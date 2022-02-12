import { combineReducers } from 'redux';
import newApi from '../../utils/api';
import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';

const initialStateIgredients = {
  ingredients: [],
  isIngredients: false,
}

const initialStateConstructor = {
  bun: {},
  elements: [],
  isElements: false,
}

const initialStateIngredient = {
  ingredient: {},
  isOpenModal: false
}
const initialStateOrder = {
  order: {},
  isOrder: false
}

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await newApi.getIdegrients()
    return response.data
  }
)

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (info) => {
    const response = await newApi.postOrders(info)
    return response.order
  }
)

export const ingredientsSlice = createSlice({
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

export const elementsSlice = createSlice({
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

export const ingredientSlice  = createSlice({
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

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  elements: elementsSlice.reducer,
  ingredient: ingredientSlice.reducer,
  order: orderSlice.reducer
})

