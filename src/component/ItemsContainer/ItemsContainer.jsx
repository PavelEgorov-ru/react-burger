import React from 'react';
import PropTypes from 'prop-types';
import styles from './ItemsContainer.module.css';
import {Counter, CurrencyIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import typeIndegrient from '../../utils/types';

const ItemsContainer = React.forwardRef(({data, onOpen, children}, ref) => {


  return (    
    <>
      <h2 className='text text_type_main-medium pt-10' ref={ref}>{children}</h2>
      <ul className = {`pr-4 pl-4 pt-6 pb-10 ${styles.itemContainer}`}>
        {data.map(item => {
          return (
            <li  key={item.uid} className = {`${styles.item}`} onClick={() => onOpen(item)}>
              {item.counter && <Counter count={item.counter} size="default"/>}
              <img className={`${styles.image} mb-2`} src={item.image} alt="картинка индигрента" />
              <div className={`${styles.price} mb-2`}>
                <p className='text text_type_digits-default mr-2'>{item.price}</p>
                <CurrencyIcon type="primary"/>
              </div>
              <p className={`${styles.description} + text text_type_main-default mb-10`}>{item.name}</p>
            </li>)
          })}      
      </ul>
      </>
  )
})

ItemsContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape(typeIndegrient),    
  ).isRequired, 
  onOpen: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,

}

export default ItemsContainer