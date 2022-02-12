import styles from './OrderDetails.module.css'
import checkIcon from '../../images/check-icon.png'
import { useSelector } from 'react-redux'

const OrderDetails = () => {
  const {order} = useSelector(store => ({
    order: store.order.order
  }))

  return(
    <>
      <p className='text text_type_digits-large mt-20'> {order.number} </p>
      <p className='text text_type_main-medium mt-8 mb-15'> идентификатор заказа </p>
      <img className={styles.image} src={checkIcon} alt="иконка успешности заказа" />
      <p className='text text_type_main-default mt-15 mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mb-15'>Дождитесь готовности на орбитальной станции</p>
    </>
  )
  

}

export default OrderDetails