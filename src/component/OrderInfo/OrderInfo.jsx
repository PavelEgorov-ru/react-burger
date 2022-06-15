import styles from './OrderInfo.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import { fetchOrderInfo, orderActions } from '../../services/reducers';
import cn from 'classnames';

const OrderInfo = () => {
  const router = useParams();
  const number = router.id;
  const match = useRouteMatch();
  console.log(match);
  const dispatch = useDispatch();
  const { ingredients } = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(fetchOrderInfo(number));
    return () => {
      dispatch(orderActions.closeModal());
    };
  }, []);

  const { orders } = useSelector((store) => store.order);
  const order = orders[0];

  const ingredientsOrder = [];

  if (order) {
    for (let i = 0; i < order.ingredients.length; i++) {
      const element = ingredients.find((item) => item._id === order.ingredients[i]);
      if (element) {
        ingredientsOrder.push(element);
      }
    }
    console.log(order);
  }

  const getCount = (id) => {
    let count = 0;
    ingredientsOrder.forEach((ingredient) => {
      if (ingredient._id === id) count += 1;
    });
    return count;
  };

  const totaPrice = ingredientsOrder.reduce((acc, ingredient) => acc + ingredient.price, 0);

  if (!order) return <div>загрузка данных</div>;

  return (
    <>
      <p className="text text_type_digits-default mb-10">{`#${order.number}`}</p>
      <p className={`text text_type_main-medium mb-3 ${styles.nameOrder}`}>{order.name}</p>
      <p
        className={cn(`text text_type_main-default ${styles.status}`, {
          [styles.done]: order.status === 'done',
        })}
      >
        {order.status === 'done' ? 'Выполнено' : 'pending' ? 'Готовится' : 'Создан'}
      </p>
      <div className={styles.container}>
        <p className="text text_type_main-medium"> Выполнено:</p>
        <ul className={styles.listIngredients}>
          {ingredientsOrder.map((item) => {
            return (
              <li key={item._id} className={styles.li}>
                <div className={styles.nameContainer}>
                  <div
                    className={styles.icon}
                    style={{
                      backgroundImage: `url(${item.image})`,
                    }}
                  />
                  <p className={`text text_type_main-default ${styles.name}`}>{item.name}</p>
                </div>

                <div className={styles.price}>
                  <p className="text text_type_digits-default">{`${getCount(item._id)} x ${
                    item.price
                  }`}</p>
                  <CurrencyIcon />
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.footer}>
          <p className="text text_type_main-medium text_color_inactive">{order.updatedAt}</p>
          <div className={styles.price}>
            <p className="text text_type_digits-default">{totaPrice}</p>
            <CurrencyIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderInfo;
