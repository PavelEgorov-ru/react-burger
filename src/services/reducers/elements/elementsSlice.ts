import { createSlice, nanoid } from '@reduxjs/toolkit';

/* здесь интерфейс для начального стейта. Я так понимаю, он типизирует и стейт
который прилетает в редьюсер*/
interface IStateConstructor {
  bun: {} | IElement | IIngredient,
  elements: [] | Array<IElement>,
  isElements: boolean
}

// интерфейс ингредиента, который прилетает для контсруктора, перед получением
// уникального  id
interface IIngredient {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
}

// интерфейс элемента, который попадает в массив для конструктора
interface IElement extends IIngredient {
  uid: string
}

const initialStateConstructor: IStateConstructor = {
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
      // указал тип для аргумента text
      // сбда же прилетает ингредиент без уникального id
      prepare: (text: IIngredient) => {
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