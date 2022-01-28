import React, { useState, useEffect} from 'react';
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
import {getIngredients, getElementsConstructor} from '../../services/actions/index';

  const App = () => {

  const {isIngredients, isElements, isOpenModal} = useSelector((store) => ({
    isElements: store.elements.isElements,  
    isIngredients: store.ingredients.isIngredients,
    isOpenModal: store.ingredient.isOpenModal
  }));
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getIngredients())
  }, [])

  const [orderDetailsIsOpen, setOrderDetailsIsOpen] = useState(false)
  
  const openOrderDetails = () => {
    setOrderDetailsIsOpen(true)
  }
  
 

  return (
    <div className={styles.app}>
      {isOpenModal
      && (<Modal title = "Детали заказа">
            <IngredientDetails />
          </Modal>)}

      {orderDetailsIsOpen
      && (<Modal>
            <OrderDetails/>
          </Modal>)}

      <AppHeader/>
      {isIngredients
      && (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
              <BurgerIngredients/>
              { isElements
              ? <BurgerConstructor onOpen = {openOrderDetails}/>
              : <BurgerContainer />}
            </main>
        </DndProvider>
          )}
    </div>
  );
}

export default App;
