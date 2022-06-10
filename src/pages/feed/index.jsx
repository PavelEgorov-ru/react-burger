import styles from './feed.module.css';
import { dataTest } from '../../utils/constants';
import FeedList from '../../component/FeedList/FeedList';
import FeedInfo from '../../component/FeedInfo/FeedInfo';

export const FeedPage = () => {
  // return <FeedList />;
  return (
    <div className={styles.main}>
      <FeedList />
      <FeedInfo />
    </div>
  );
};
