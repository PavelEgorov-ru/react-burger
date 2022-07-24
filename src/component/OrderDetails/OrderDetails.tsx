import cn from 'classnames';
import styles from './OrderDetails.module.css';
import checkIcon from '../../images/check-icon.png';
import { useAppSelector } from '../../hoocks';

const OrderDetails = () => {
  const { orderInfo } = useAppSelector((store) => store.order);

  if (orderInfo.ingredients.length === 0) <div>Загрузка данных</div>;

  return (
    <>
      <p className={cn('text text_type_digits-large mt-20')}>{orderInfo.number}</p>
      <p className={cn('text text_type_main-medium mt-8 mb-15')}> идентификатор заказа </p>
      <img className={cn(styles.image)} src={checkIcon} alt="иконка успешности заказа" />
      <p className={cn('text text_type_main-default mt-15 mb-2')}>Ваш заказ начали готовить</p>
      <p className={cn('text text_type_main-default text_color_inactive mb-15')}>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

export default OrderDetails;
