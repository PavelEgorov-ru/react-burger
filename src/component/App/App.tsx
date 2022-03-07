import {FC, ReactNode, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../hoocks/hoocks';
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
import {fetchIngredients} from '../../services/reducers/ingredients/ingredientsSlice';
import { ingredientActions, orderActions} from '../../services/reducers/index'


  const App: FC<Readonly<{ children?: ReactNode }>> =  () => {

  const {isElements} = useAppSelector(store => store.elements)
  const {isIngredients} = useAppSelector(store => store.ingredients)
  const {isOpenModal} = useAppSelector(store => store.ingredient)
  const {isOrder} = useAppSelector(store => store.order)

  const dispatch = useAppDispatch()

  const onClose = () => {
    isOpenModal
    ? dispatch(ingredientActions.closeModal())
    : dispatch(orderActions.closeModal())  
  }

  useEffect(() => {
    dispatch(fetchIngredients())
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {isIngredients
      && (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
              <BurgerIngredients/>
              { isElements ? <BurgerConstructor /> : <BurgerContainer />}
            </main>
        </DndProvider>
          )}
    </div>
  );
}

export default App;
