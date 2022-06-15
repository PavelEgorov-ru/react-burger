import styles from './OrderInfo.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOrderInfo } from '../../services/reducers';

const OrderInfo = () => {
  const router = useParams();
  const number = router.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrderInfo(number));
  }, []);

  const { orders } = useSelector((store) => store.order);
  console.log(orders);

  return <div>информация о заказе</div>;
};

export default OrderInfo;
