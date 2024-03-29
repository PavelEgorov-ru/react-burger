import styles from './FeedInfo.module.css';
import { useAppSelector } from '../../hoocks';
import { nanoid } from '@reduxjs/toolkit';
import type { IOrderObj } from './type';

const FeedInfo = () => {
  const { orders, total, totalToday } = useAppSelector((store) => store.socket);

  const ordersDone: IOrderObj[] = [];
  const ordersCreated: IOrderObj[] = [];

  orders.forEach((item) => {
    if (item.status === 'done') {
      ordersDone.push(item);
    } else if (item.status === 'created') {
      ordersCreated.push(item);
    } else return;
  });

  return (
    <section className={styles.sectionSize}>
      <div className={styles.statusSection}>
        <div className={styles.statusDone}>
          <p className={`text text_type_main-medium ${styles.title}`}> Готовы: </p>
          <div className={styles.numbers}>
            {ordersDone.map((item) => {
              return (
                <p className={`text text_type_digits-default ${styles.order}`} key={nanoid()}>
                  {item.number}
                </p>
              );
            })}
          </div>
        </div>
        <div className={styles.statusCreated}>
          <p className={`text text_type_main-medium ${styles.title}`}> В работе: </p>
          <div className={styles.numbers}>
            {ordersCreated.map((item) => {
              return (
                <p className="text text_type_digits-default" key={nanoid()}>
                  {item.number}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div className={styles.info}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </section>
  );
};

export default FeedInfo;
