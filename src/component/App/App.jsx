import { useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import OrderInfo from '../OrderInfo/OrderInfo';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { orderActions, fetchIngredients, fetchCheckUser } from '../../services/reducers';
import {
  RegisterPage,
  HomePage,
  LoginPage,
  ForgotPage,
  ResetPage,
  ProfilePage,
  OrderPage,
  FeedPage,
} from '../../pages';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const history = useHistory();
  const dispatch = useDispatch();
  const { isOrder } = useSelector((store) => store.order);

  const onCloseOrder = () => {
    dispatch(orderActions.closeModal());
  };

  const checkAuth = () => {
    const token = getCookie('burgerToken');
    const refToken = localStorage.getItem('refBurgerToken');
    if (token) {
      dispatch(fetchCheckUser(refToken));
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
        <ProtectedRoute path="/profile/orders" exact={true}>
          <OrderPage />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route exact={true} path="/ingredients/:id">
          <div className={styles.app__ingredientContainer}>
            <IngredientDetails />
          </div>
        </Route>
        <Route exact={true} path="/feed/:id">
          <div className={styles.app__ingredientContainer}>
            <OrderInfo />
          </div>
        </Route>
        <Route exact={true} path="/profile/orders/:id">
          <div className={styles.app__ingredientContainer}>
            <OrderInfo />
          </div>
        </Route>
      </Switch>

      {background && (
        <>
          <Route path="/ingredients/:id" exact={true}>
            <Modal>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path="/feed/:id" exact={true}>
            <Modal>
              <OrderInfo />
            </Modal>
          </Route>
          <Route path="/profile/orders/:id" exact={true}>
            <Modal>
              <OrderInfo />
            </Modal>
          </Route>
        </>
      )}

      {/* {background && (
        <Route path="/feed/:id" exact={true}>
          <Modal>
            <OrderInfo />
          </Modal>
        </Route>
      )} */}
    </div>
  );
};

export default App;
