import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '@ya.praktikum/react-developer-burger-ui-components';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerContainer from '../BurgerContainer/BurgerContainer'
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import {fetchIngredients, ingredientSlice, orderSlice} from '../../services/reducers/index'

  const App = () => {

  

  const {isIngredients, isElements, isOpenModal, isOrder} = useSelector((store) => ({
    isElements: store.elements.isElements,  
    isIngredients: store.ingredients.isIngredients,
    isOpenModal: store.ingredient.isOpenModal,
    isOrder: store.order.isOrder
  }));

  const dispatch = useDispatch()

  const ingredientActions = ingredientSlice.actions
  const orderActions = orderSlice.actions

  const onClose = () => {
    isOpenModal
    ? dispatch(ingredientActions.closeModal())
    : dispatch(orderActions.closeModal())  
  } 

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [])
  
  return (
    <div className={styles.app}>
      {isOpenModal
      && (<Modal title = "Детали заказа" onClose={onClose}>
            <IngredientDetails />
          </Modal>)}

      {isOrder
       && (<Modal onClose={onClose}>
            <OrderDetails/>
          </Modal>)}

      <AppHeader/>
      {isIngredients
      && (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
              <BurgerIngredients/>
              { isElements ? <BurgerConstructor /> : <BurgerContainer />}
            </main>
        </DndProvider>
          )}
    </div>
  );
}

export default App;
