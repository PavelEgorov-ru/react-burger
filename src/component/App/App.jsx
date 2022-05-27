import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {
  ingredientActions,
  orderActions,
  userActions,
  fetchIngredients,
  fetchCheckUser,
} from '../../services/reducers';
import { RegisterPage, HomePage, LoginPage, ForgotPage, ResetPage, ProfilePage } from '../../pages';
import { getCookie } from '../../utils/cookie';
import { store } from '../../services';

const App = () => {
  const dispatch = useDispatch();
  const { isOpenModal } = useSelector((store) => store.ingredient);
  const { isOrder } = useSelector((store) => store.order);
  const { isRegistration } = useSelector((store) => store.user);

  const onClose = () => {
    isOpenModal ? dispatch(ingredientActions.closeModal()) : dispatch(orderActions.closeModal());
  };

  const auth = () => {
    if (getCookie('burgerToken')) {
      dispatch(fetchCheckUser());
    } else {
      dispatch(userActions.endLoader());
    }
  };

  useEffect(() => {
    console.log('сработал юзэффект');
    dispatch(fetchIngredients());
    auth();
  }, []);

  return (
    <div className={cn(styles.app)}>
      {isOpenModal && (
        <Modal title="Детали заказа" onClose={onClose}>
          <IngredientDetails />
        </Modal>
      )}

      {isOrder && (
        <Modal onClose={onClose}>
          <OrderDetails />
        </Modal>
      )}

      <Router>
        <AppHeader />
        <Switch>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/forgot-password">
            <ForgotPage />
          </Route>
          <Route path="/reset-password">
            <ResetPage />
          </Route>
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
