import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { ingredientActions, orderActions, fetchIngredients } from '../../services/reducers';
import { HomePage } from '../../pages/home/home';

const App = () => {

  const {isOpenModal} = useSelector(store => store.ingredient)
  const {isOrder} = useSelector(store => store.order)

  const dispatch = useDispatch()

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
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <HomePage/>
          </Route>
        </Switch>
      </Router>      
    </div>
  );
}

export default App;
