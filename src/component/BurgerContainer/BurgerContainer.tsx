import styles from './BurgerContainer.module.css';
import { useDrop } from 'react-dnd';
import { useAppDispatch } from '../../hoocks';
import cn from 'classnames';
import { elementsActions } from '../../services/reducers/index';
import type { IIngredient } from './type';

const BurgerContainer = () => {
  const dispatch = useAppDispatch();

  const [{ isHover }, dropRef] = useDrop({
    accept: 'bun',
    drop(item: IIngredient) {
      console.log(item);
      dispatch(elementsActions.postBun(item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <div className={cn(styles.container)} ref={dropRef}>
      <div className={cn(styles.bun_top)}>
        <p className={cn('text text_type_main-default')}>
          Перетащите сюда булочку, а затем ингредиенты
        </p>
      </div>
      <div className={cn(styles.bun_bottom)}></div>
    </div>
  );
};

export default BurgerContainer;

//const boxShadow = isHover ? '0 0 20px #6434db' : null;
//style={{ boxShadow }}
