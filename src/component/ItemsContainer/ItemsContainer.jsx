import React from 'react';
import PropTypes from 'prop-types';
import styles from './ItemsContainer.module.css';
import typeIndegrient from '../../utils/types';
import Item from '../Item/Item'


const ItemsContainer = React.forwardRef(({data, onOpen, children,}, ref) => {
  return (    
    <>
      <h2 className='text text_type_main-medium pt-10' ref={ref}>{children}</h2>
      <ul className = {`pr-4 pl-4 pt-6 pb-10 ${styles.itemContainer}`}>
        {data.map(item => {
          return (
            <Item key={item.uid} item = {item} onOpen={onOpen}/>
          )
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