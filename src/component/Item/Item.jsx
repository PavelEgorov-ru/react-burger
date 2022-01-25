import styles from './Item.module.css';
import { useDrag } from "react-dnd";
import {Counter, CurrencyIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import typeIndegrient from '../../utils/types';
import PropTypes from 'prop-types';

const Item = ({item, onOpen}) => {
  return(
    <li key={item.uid} className = {styles.item} onClick={() => onOpen(item)} draggable={true} >
     {item.counter && <Counter count={item.counter} size="default"/>}
        <img className={`${styles.image} mb-2`} src={item.image} alt="картинка индигрента" />
        <div className={`${styles.price} mb-2`}>
          <p className='text text_type_digits-default mr-2'>{item.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`${styles.description} + text text_type_main-default mb-10`}>{item.name}</p>
    </li>
  )
}

Item.propTypes = {
  item: PropTypes.shape(typeIndegrient).isRequired, 
  onOpen: PropTypes.func.isRequired,
}

export default Item