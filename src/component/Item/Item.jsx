import styles from './Item.module.css';
import { useDrag } from "react-dnd";
import {Counter, CurrencyIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import typeIndegrient from '../../utils/types';
import PropTypes from 'prop-types';

const Item = ({item, onOpen,}) => {
  const {_id, counter, image, price, name, type} = item


  return(
    <li className = {styles.item} onClick={() => onOpen(item)} draggable={true}>
     {counter && <Counter count={counter} size="default"/>}
        <img className={`${styles.image} mb-2`} src={image} alt="картинка индигрента" />
        <div className={`${styles.price} mb-2`}>
          <p className='text text_type_digits-default mr-2'>{price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`${styles.description} + text text_type_main-default mb-10`}>{name}</p>
    </li>
    
  )
}

Item.propTypes = {
  item: PropTypes.shape(typeIndegrient).isRequired, 
  onOpen: PropTypes.func.isRequired,
}

export default Item