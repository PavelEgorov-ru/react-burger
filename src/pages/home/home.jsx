import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../component/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../component/BurgerConstructor/BurgerConstructor';
import BurgerContainer from '../../component/BurgerContainer/BurgerContainer';
import { useSelector } from 'react-redux';
import styles from './home.module.css';



export const HomePage = () => {
  const {isIngredients} = useSelector(store => store.ingredients);
  const {isElements} = useSelector(store => store.elements);

  return (
    isIngredients && (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
              <BurgerIngredients/>
              { isElements ? <BurgerConstructor /> : <BurgerContainer />}
            </main>
        </DndProvider>
          )
   
  )
} 
