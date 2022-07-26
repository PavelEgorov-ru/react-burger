import styles from './OrderInfo.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hoocks';
import { useParams } from 'react-router-dom';
import { fetchOrderInfo, orderActions } from '../../services/reducers';
import { dateUtils } from '../../utils/date-utils';
import cn from 'classnames';
import { nanoid } from '@reduxjs/toolkit';
import type { IIngredient } from './type';

const OrderInfo = () => {
  const router = useParams<any>();
  const number = router.id;
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector((store) => store.ingredients);
  const { order } = useAppSelector((store) => store.order);

  useEffect(() => {
    dispatch(fetchOrderInfo(number));
    return () => {
      dispatch(orderActions.closeModal());
    };
  }, []);
  const ingredientsOrder: IIngredient[] = [];

  if (order.length === 0) return <div>загрузка данных</div>;

  const orderObj = order[0];

  for (let i = 0; i < orderObj.ingredients.length; i++) {
    const element = ingredients.find((item) => item._id === orderObj.ingredients[i]);
    if (element) {
      ingredientsOrder.push(element);
    }
  }

  const getCount = (id: string) => {
    let count = 0;
    ingredientsOrder.forEach((ingredient) => {
      if (ingredient._id === id) count += 1;
    });
    return count;
  };

  const totaPrice = ingredientsOrder.reduce((acc, ingredient) => acc + ingredient.price, 0);

  return (
    <>
      <p
        className={cn(`text text_type_digits-default mb-10 ${styles.numberOrder}`)}
      >{`#${orderObj.number}`}</p>
      <p className={cn(`text text_type_main-medium mb-3 ${styles.nameOrder}`)}>{orderObj.name}</p>
      <p
        className={cn(`text text_type_main-default ${styles.status}`, {
          [styles.done]: orderObj.status === 'done',
        })}
      >
        {orderObj.status === 'done' ? 'Выполнено' : 'pending' ? 'Готовится' : 'Создан'}
      </p>
      <div className={styles.container}>
        <p className="text text_type_main-medium"> Выполнено:</p>
        <ul className={styles.listIngredients}>
          {ingredientsOrder.map((item) => {
            return (
              <li key={nanoid()} className={styles.li}>
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
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.footer}>
          <p className="text text_type_main-default text_color_inactive">
            {dateUtils(orderObj.updatedAt)}
          </p>
          <div className={styles.price}>
            <p className="text text_type_digits-default">{totaPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderInfo;
