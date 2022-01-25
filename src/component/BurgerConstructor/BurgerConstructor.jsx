import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import typeIndegrient from '../../utils/types';

const BurgerConstructor = React.memo(({data, onOpen}) => {
  const bun = data.filter(element => element.type === 'bun' )
  console.log(bun)

  const generateUniqueKey = () => {
    return Math.random()
  }
  const elements =React.useMemo(() => {
  return   data.filter(element => element.type !== 'bun' )
        .map(element => ({...element, uid: generateUniqueKey()}))
  }, [data]) 
  return (
    <section className={`pt-25 + ${styles.container}`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image}
      />

      <ul className={styles.ul}>
        {
          elements.map(element => {
            return (
              <li key={element.uid} className={styles.li}>
                <DragIcon/>
                <ConstructorElement
                text={element.name}
                price={element.price}
                thumbnail={element.image}
                />
              </li>)
          })
        }        
      </ul>      
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image}
      />
      <div>
      <div className={`${styles.container_btm} + mt-10`}>
        <div className={styles.container_price}>
          <p className='text text_type_digits-medium mr-2'>620</p>
          <CurrencyIcon type="primary"/>
        </div>        
        <Button type="primary" size="medium" onClick = {onOpen}> Оформить заказ </Button>
      </div>
    </div>
  </section>
  )
})

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape(typeIndegrient)
  ).isRequired,
  onOpen: PropTypes.func.isRequired
}

export default BurgerConstructor 