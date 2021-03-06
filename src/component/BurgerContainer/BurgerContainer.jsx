import styles from './BurgerContainer.module.css';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { elementsActions } from '../../services/reducers/index';

const BurgerContainer = () => {
  const dispatch = useDispatch();

  const [{ isHover }, dropRef] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch(elementsActions.postBun(item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const boxShadow = isHover ? '0 0 20px #6434db' : null;

  return (
    <div className={cn(styles.container)} ref={dropRef}>
      <div className={cn(styles.bun_top)} style={{ boxShadow }}>
        <p className={cn('text text_type_main-default')}>
          Перетащите сюда булочку, а затем ингредиенты
        </p>
      </div>
      <div className={cn(styles.bun_bottom)} style={{ boxShadow }}></div>
    </div>
  );
};

export default BurgerContainer;
