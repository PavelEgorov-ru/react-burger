import cn from 'classnames';
import styles from './FeedList.module.css';
import { dataTest } from '../../utils/constants';
import FeedCard from '../FeedCard/FeedCard';

const FeedList = () => {
  return (
    <section className={cn(styles.sectionSize)}>
      <h1 className={cn('text text_type_main-large mt-10 mb-5')}>Лента заказов</h1>
      <div className={cn(styles.container)}>
        {dataTest.orders.map((card) => (
          <FeedCard {...card} key={card.createdAt} />
        ))}
      </div>
    </section>
  );
};

export default FeedList;
