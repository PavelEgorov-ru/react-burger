import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
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
import { hydrate } from 'react-dom';

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const history = useHistory();
  const dispatch = useDispatch();
  const { isOpenModal } = useSelector((store) => store.ingredient);
  const { isOrder } = useSelector((store) => store.order);

  const onCloseOrder = () => {
    dispatch(orderActions.closeModal());
  };

  const onCloseIngredient = () => {
    history.goBack();
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
        <Modal onClose={onCloseOrder}>
          <OrderDetails />
        </Modal>
      )}

      {/* <Router> */}
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPage />
        </Route>
        <Route path="/reset-password" exact={true}>
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
        <Route exact={true} path="/ingredients/:id">
          <div className={styles.app__ingredientContainer}>
            <IngredientDetails />
          </div>
        </Route>
      </Switch>
      {/* </Router> */}

      {background && (
        // <Switch>
        <Route path="/ingredients/:id" exact={true}>
          <Modal onClose={onCloseIngredient}>
            <IngredientDetails />
          </Modal>
        </Route>
        // </Switch>
      )}
    </div>
  );
};

export default App;

//location={background || location}
