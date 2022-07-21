import styles from './feed.module.css';
import FeedList from '../../component/FeedList/FeedList';
import FeedInfo from '../../component/FeedInfo/FeedInfo';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../hoocks';
import { useEffect } from 'react';
import { wsActions } from '../../services/reducers';

export const FeedPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsActions.connectionFeedList('all'));

    return () => {
      dispatch(wsActions.wsClose());
    };
  }, [dispatch]);

  return (
    <div className={styles.main}>
      <FeedList />
      <FeedInfo />
    </div>
  );
};
