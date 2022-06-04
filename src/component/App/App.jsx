import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
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
  fetchNewToken,
} from '../../services/reducers';
import {
  RegisterPage,
  HomePage,
  LoginPage,
  ForgotPage,
  ResetPage,
  ProfilePage,
  OrderPage,
} from '../../pages';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  console.log(location.state);
  const dispatch = useDispatch();
  const { isOpenModal } = useSelector((store) => store.ingredient);
  const { isOrder } = useSelector((store) => store.order);

  const onClose = () => {
    isOpenModal ? dispatch(ingredientActions.closeModal()) : dispatch(orderActions.closeModal());
  };

  const checkAuth = () => {
    const token = getCookie('burgerToken');
    const refToken = localStorage.getItem('refBurgerToken');
    if (token !== undefined) {
      dispatch(fetchCheckUser());
    } else if (token === undefined && refToken !== null) {
      dispatch(fetchNewToken({ token: refToken }));
    } else {
      dispatch(userActions.endLoader());
    }
  };

  useEffect(() => {
    dispatch(fetchIngredients());
    checkAuth();
  }, []);

  return (
    <div className={cn(styles.app)}>
      {isOrder && (
        <Modal onClose={onClose}>
          <OrderDetails />
        </Modal>
      )}

      <Router>
        <AppHeader />
        <Switch location={background || location}>
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
          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/order" exact={true}>
            <OrderPage />
          </ProtectedRoute>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route exact path="/ingredients/:id">
            <div className={styles.app__ingredientContainer}>
              <IngredientDetails />
            </div>
          </Route>
        </Switch>
      </Router>

      {background && (
        <Switch>
          <Route path="/ingredients/:id" exact={true}>
            <Modal onClose={onClose}>
              <IngredientDetails />
            </Modal>
          </Route>
        </Switch>
      )}
    </div>
  );
};

export default App;

//location={background || location}
