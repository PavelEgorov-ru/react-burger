import styles from './OrderInfo.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOrderInfo, orderActions } from '../../services/reducers';

const OrderInfo = () => {
  const router = useParams();
  const number = router.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrderInfo(number));
    return () => {
      dispatch(orderActions.closeModal());
    };
  }, []);

  const { orders } = useSelector((store) => store.order);
  const order = orders[0];

  return <div>информация о заказе</div>;
};

export default OrderInfo;
