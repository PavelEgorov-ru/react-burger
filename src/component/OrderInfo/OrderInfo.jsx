import styles from './OrderInfo.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const OrderInfo = () => {
  const { orders } = useSelector((store) => store.socket);
  const router = useParams();
  const number = router.id;

  return <div>информация о заказе</div>;
};

export default OrderInfo;
