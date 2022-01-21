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
import {getIngredients} from '../../services/actions/index'

  const App = () => {

   const {ingredients} = useSelector((store) => store.ingredients);
   console.log(ingredients)
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
  }, [])


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
            <BurgerConstructor data = {ingredients} onOpen = {openOrderDetails}/> 
          </main>)}
    </div>
  );
}

export default App;
