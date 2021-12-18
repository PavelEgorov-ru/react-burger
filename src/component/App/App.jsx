import React, { useState, useEffect} from 'react';
import '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import newApi from '../../utils/api';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';




const App = () => {
  const [indegrients, setIndegrients] = useState([])
  const [IngredientDetailsIsOpen, setIngredientDetailsIsOpen] = useState(false)
  const [OrderDetailsIsOpen, setOrderDetailsIsOpen] = useState(false)
  const [indegrientInfo, setIndegrientInfo] = useState({})


  const closeModal = () => {
    setIngredientDetailsIsOpen(false)
    setOrderDetailsIsOpen(false)
  }

  const OpenIngredientDetails = (item) => {
    setIndegrientInfo(item)
    setIngredientDetailsIsOpen(true)
  }
  
  const OpenOrderDetails = () => {
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
    <div className={appStyles.App}>
      {IngredientDetailsIsOpen 
      && <Modal onClose = {closeModal}>
          <IngredientDetails indegrient = {indegrientInfo}/>
        </Modal>}

      {OrderDetailsIsOpen
      && <Modal onClose = {closeModal}>
          <OrderDetails/>
        </Modal>}

      <AppHeader/>
      {indegrients.length !== 0 && <main className={appStyles.main}>
        <BurgerIngredients data = {indegrients} onOpen = {OpenIngredientDetails}/>
        <BurgerConstructor data = {indegrients} onOpen = {OpenOrderDetails}/> 
      </main>}
    </div>
  );
}

export default App;
