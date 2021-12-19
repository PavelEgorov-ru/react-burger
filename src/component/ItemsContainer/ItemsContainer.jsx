import PropTypes from 'prop-types';
import itemsContainerStyles from './ItemsContainer.module.css';
import {Counter, CurrencyIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import typeIndegrient from '../../utils/types';

const ItemsContainer = ({data, onOpen, children}) => {


  return (    
    <>
      <h2 className='text text_type_main-medium pt-10'>{children}</h2>
      <ul className = {`pr-4 pl-4 pt-6 pb-10 ${itemsContainerStyles.itemContainer}`}>
        {data.map(item => {
          return (
            <li  key={item._id} className = {`${itemsContainerStyles.item}`} onClick={() => onOpen(item)}>
              {item.counter && <Counter count={item.counter} size="default"/>}
              <img className={`${itemsContainerStyles.image} mb-2`} src={item.image} alt="картинка индигрента" />
              <div className={`${itemsContainerStyles.price} mb-2`}>
                <p className='text text_type_digits-default mr-2'>{item.price}</p>
                <CurrencyIcon type="primary"/>
              </div>
              <p className={`${itemsContainerStyles.description} + text text_type_main-default mb-10`}>{item.name}</p>
            </li>)
          })}      
      </ul>
      </>
  )
}

ItemsContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape(typeIndegrient),    
  ).isRequired, 
  onOpen: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,

}

export default ItemsContainer