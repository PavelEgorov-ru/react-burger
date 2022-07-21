import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../component/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../component/BurgerConstructor/BurgerConstructor';
import BurgerContainer from '../../component/BurgerContainer/BurgerContainer';
import { useAppSelector } from '../../hoocks';
import cn from 'classnames';
import styles from './home.module.css';
import type { TProps } from './type';

export const HomePage: React.FC<TProps> = () => {
  const { isIngredients } = useAppSelector((store) => store.ingredients);
  const { isElements } = useAppSelector((store) => store.elements);

  return isIngredients ? (
    <DndProvider backend={HTML5Backend}>
      <main className={cn(styles.main)}>
        <BurgerIngredients />
        {isElements ? <BurgerConstructor /> : <BurgerContainer />}
      </main>
    </DndProvider>
  ) : null;
};
