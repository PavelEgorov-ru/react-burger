import cn from 'classnames';
import styles from './Item.module.css';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import typeIndegrient from '../../utils/types';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ingredientActions } from '../../services/reducers/index';
import { Link, useLocation } from 'react-router-dom';

const Item = ({ item }) => {
  const location = useLocation();
  // console.log(location);

  const { bun } = useSelector((store) => store.elements);
  const { elements } = useSelector((store) => store.elements);

  const dispatch = useDispatch();

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

  const openModal = (item) => {
    console.log('111');
    dispatch(ingredientActions.openModal(item));
  };

  const boxShadow = isDrag ? '0 0 20px #6434db' : null;

  return (
    <li
      className={cn(styles.item)}
      // onClick={() => openModal(item)}
      draggable
      ref={dragRef}
      style={{ boxShadow }}
    >
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

Item.propTypes = {
  item: PropTypes.shape(typeIndegrient).isRequired,
};

export default Item;
