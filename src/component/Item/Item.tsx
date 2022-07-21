import cn from 'classnames';
import styles from './Item.module.css';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../hoocks';
import { Link, useLocation } from 'react-router-dom';
import type { TProps } from './type';

const Item: React.FC<TProps> = ({ item }) => {
  const location = useLocation();

  const { bun } = useAppSelector((store) => store.elements);
  const { elements } = useAppSelector((store) => store.elements);

  let count = 0;
  if (item._id === bun._id) {
    count += 1;
  } else {
    elements.forEach((element) => {
      if (element._id === item._id) return (count = count + 1);
      return count;
    });
  }

  const [{ isDrag }, dragRef] = useDrag({
    type: item.type,
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <li className={cn(styles.item)} draggable ref={dragRef}>
      <Link
        to={{
          pathname: `/ingredients/${item._id}`,
          state: { background: location },
        }}
        className={styles.item__link}
      >
        {count !== 0 && <Counter count={count} size="default" />}
        <img className={cn(`${styles.image} mb-2`)} src={item.image} alt="картинка индигрента" />
        <div className={cn(`${styles.price} mb-2`)}>
          <p className={cn('text text_type_digits-default mr-2')}>{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={cn(`${styles.description} text text_type_main-default mb-10`)}>{item.name}</p>
      </Link>
    </li>
  );
};

export default Item;

// const boxShadow = isDrag ? '0 0 20px #6434db' : null;
// style={{ boxShadow }}
