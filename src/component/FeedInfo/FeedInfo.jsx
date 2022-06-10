import styles from './FeedInfo.module.css';
import { useSelector } from 'react-redux';
import { dataTest } from '../../utils/constants';

const FeedInfo = () => {
  const items = dataTest.orders;

  const ordersDone = [];
  const ordersCreated = [];

  items.forEach((item) => {
    if (item.status === 'done') {
      ordersDone.push(item);
    } else if (item.status === 'created') {
      ordersCreated.push(item);
    } else return;
  });

  console.log(ordersDone);
  console.log(ordersCreated);

  return (
    <section className={styles.sectionSize}>
      <div className={styles.statusSection}>
        <div className={styles.statusDone}>
          <p className={`text text_type_main-medium ${styles.title}`}> Готовы: </p>
          <div className={styles.number}>
            {ordersDone.map((item) => {
              return (
                <p className={`text text_type_digits-default ${styles.order}`} key={item._id}>
                  {item._id}
                </p>
              );
            })}
          </div>
        </div>
        <div className={styles.statusCreated}>
          <p className={`text text_type_main-medium ${styles.title}`}> В работе: </p>
          <div className={styles.number}>
            {ordersCreated.map((item) => {
              return (
                <p className="text text_type_digits-default" key={item._id}>
                  {item._id}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedInfo;
