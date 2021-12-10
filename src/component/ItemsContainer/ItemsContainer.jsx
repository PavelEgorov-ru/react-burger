
import itemsContainerStyles from './ItemsContainer.module.css';
import {Counter, CurrencyIcon,} from '@ya.praktikum/react-developer-burger-ui-components'

const ItemsContainer = ( props) => {
  return (    
    <>
      <h2 className='text text_type_main-medium pt-10'>{props.children}</h2>
      <ul className = {`pr-4 pl-4 pt-6 pb-10 ${itemsContainerStyles.itemContainer}`}>
        {props.data.map(item => {
          return (
            <li className = {`${itemsContainerStyles.item}`}>
              {item.counter && <Counter count={item.counter} size="default"/>}
              <img className={`${itemsContainerStyles.image} + mb-2`} key={item.__id}src={item.image} alt="картинка индигрента" />
              <div className={`${itemsContainerStyles.price} + mb-2`}>
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

export default ItemsContainer