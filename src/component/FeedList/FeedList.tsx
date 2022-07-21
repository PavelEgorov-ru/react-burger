import cn from 'classnames';
import styles from './FeedList.module.css';
import FeedCard from '../FeedCard/FeedCard';
import { useAppSelector } from '../../hoocks';
import { nanoid } from '@reduxjs/toolkit';

const FeedList = () => {
  const { orders } = useAppSelector((store) => store.socket);

  return (
    <section className={cn(styles.sectionSize)}>
      <h1 className={cn('text text_type_main-large mt-10 mb-5')}>Лента заказов</h1>
      <div className={cn(styles.container)}>
        {orders.map((card) => (
          <FeedCard {...card} key={nanoid()} />
        ))}
      </div>
    </section>
  );
};

export default FeedList;
