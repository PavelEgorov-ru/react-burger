import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useDrop } from "react-dnd";
import styles from './BurgerConstructor.module.css';
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Element from '../Element/Element';
// import {elementsSlice, fetchOrder} from '../../services/reducers/index';
import {elementsActions} from '../../services/reducers/index';
import {fetchOrder} from '../../services/reducers/order/orderSlice';


const BurgerConstructor = React.memo(() => {
  // const {actions} = elementsSlice
  const dispatch = useDispatch()
  const {bun, elements} = useSelector(store => ({
    bun: store.elements.bun,
    elements: store.elements.elements
  }))

  const arrayElements = [bun, ...elements]
  const count = arrayElements.reduce((acc, item) => {
    return acc + item.price
  }, 0)


  const onClick = (arrayElements) => {
    const arrayId =  arrayElements.map(function(element){
        return element._id
      })
    dispatch(fetchOrder({"ingredients": arrayId}))
  }

  const moveCard = (dragIndex, hoverIndex) => {
    
    const newElements = [...elements]
    let dragElement = newElements[dragIndex]
    newElements.splice(dragIndex, 1)
    newElements.splice(hoverIndex, 0, dragElement)
    dispatch(elementsActions.newOrderElements(newElements))
  }

  const [, dropBunRef] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch(elementsActions.postBun(item))
    },
  })

  const [{isHover}, dropRef] = useDrop({
    accept: ['sauce', 'main'],
    drop(item) {
      dispatch(elementsActions.postElement(item))
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  })

  const boxShadow = isHover ? '0 0 20px #6434db' : null;
 

  return (
    <section className={`pt-25 + ${styles.container}`}>
      <div className={styles.bun} ref={dropBunRef}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <ul className={styles.ul} ref={dropRef} >
        {elements.length !== 0
        ? elements.map((element, index) => {return <Element element={element} moveCard={moveCard} index={index} key={element.uid}/>})
        : <div className={styles.box} style={{boxShadow}}>
            <p className='text text_type_main-default text_color_inactive'>
              Выберите себе вкусную начинку. Можно несколько
            </p>
          </div>
        }        
      </ul>
      <div className={styles.bun}>
        <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
      </div>
      <div className={`${styles.container_btm} + mt-10`}>
        <div className={styles.container_price}>
          <p className='text text_type_digits-medium mr-2'>{count}</p>
          <CurrencyIcon type="primary"/>
        </div>        
        <Button type="primary" size="medium" onClick={() => onClick(arrayElements)}> Оформить заказ </Button>
      </div>
  </section>
  )
})

export default BurgerConstructor