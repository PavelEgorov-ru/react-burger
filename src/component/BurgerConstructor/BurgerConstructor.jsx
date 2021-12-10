import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructor = ({data}) => {
  const bun = data[0]
  const elements = data.filter(element => element.type !== 'bun' )
  return (
    <section className={`pt-25 + ${burgerConstructorStyles.container}`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image}
      />

      <ul className={burgerConstructorStyles.ul}>
        {
          elements.map(element => {
            return (
              <li key={element._id} className={burgerConstructorStyles.li}>
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
      <div className={`${burgerConstructorStyles.container_btm} + mt-10`}>
        <div className={burgerConstructorStyles.container_price}>
          <p className='text text_type_digits-medium mr-2'>620</p>
          <CurrencyIcon type="primary"/>
        </div>        
        <Button type="primary" size="medium"> Оформить заказ </Button>
      </div>
    </div>
  </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      image_mobile: PropTypes.string,
      price: PropTypes.number,
    })
  )
}

export default BurgerConstructor 