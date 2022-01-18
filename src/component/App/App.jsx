import React, { useState, useEffect} from 'react';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import newApi from '../../utils/api';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { createStore } from 'redux';
import  {rootReducer} from '../../services/reducers/index';


const store = createStore(rootReducer);

  const App = () => {
  const [indegrients, setIndegrients] = useState([])
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
    newApi.getIdegrients()
    .then((indegrientData) => {
      setIndegrients(indegrientData.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])


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
      {indegrients.length !== 0 
      && (<main className={styles.main}>
            <BurgerIngredients data = {indegrients} onOpen = {openIngredientDetails}/>
            <BurgerConstructor data = {indegrients} onOpen = {openOrderDetails}/> 
          </main>)}
    </div>
  );
}

export default App;
