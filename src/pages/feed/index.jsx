import styles from './feed.module.css';
import { dataTest } from '../../utils/constants';
import FeedList from '../../component/FeedList/FeedList';
import FeedInfo from '../../component/FeedInfo/FeedInfo';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { wsActions } from '../../services/reducers';

export const FeedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsActions.testAstion1());
  }, []);

  return (
    <div className={styles.main}>
      <FeedList />
      <FeedInfo />
    </div>
  );
};
