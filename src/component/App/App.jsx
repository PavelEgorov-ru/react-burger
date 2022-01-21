import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import {getIngredients, getElementsConstructor} from '../../services/actions/index';

  const App = () => {

  const {ingredients, elements} = useSelector((store) => ({
    ingredients: store.ingredients.ingredients,
    elements: store.constructor.elements
  }));
  
  const dispatch = useDispatch()


  const [ingredientDetailsIsOpen, setIngredientDetailsIsOpen] = useState(false)
  const [orderDetailsIsOpen, setOrderDetailsIsOpen] = useState(false)
  const [indegrientInfo, setIndegrientInfo] = useState({})


  const closeModal = () => {
    setIngredientDetailsIsOpen(false)
    setOrderDetailsIsOpen(false)
  }

  const openIngredientDetails = (item) => {
    setIndegrientInfo(item)
    setIngredientDetailsIsOpen(true)
  }
  
  const openOrderDetails = () => {
    setOrderDetailsIsOpen(true)
  }
  
  React.useEffect(() => {
    dispatch(getIngredients())
    dispatch(getElementsConstructor())
  }, [])

  

  console.log(elements)
  console.log(ingredients)


  return (
    <div className={styles.app}>
      {ingredientDetailsIsOpen 
      && (<Modal onClose = {closeModal} title = "Детали заказа">
            <IngredientDetails indegrient = {indegrientInfo} />
          </Modal>)}

      {orderDetailsIsOpen
      && (<Modal onClose = {closeModal}>
            <OrderDetails/>
          </Modal>)}

      <AppHeader/>
      {ingredients.length !== 0 
      && (<main className={styles.main}>
            <BurgerIngredients data = {ingredients} onOpen = {openIngredientDetails}/>
            <BurgerConstructor data = {elements} onOpen = {openOrderDetails}/>
          </main>)}
    </div>
  );
}

export default App;
