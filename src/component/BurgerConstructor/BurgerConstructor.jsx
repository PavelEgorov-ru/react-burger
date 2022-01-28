import React, {useMemo} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useDrop } from "react-dnd";
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Element from '../Element/Element';
import {postElementConstructor} from '../../services/actions/index';
import {postBunConstructor} from '../../services/actions/index';


const BurgerConstructor = React.memo(({onOpen}) => {
  const {bun, elements} = useSelector(store => ({
    bun: store.elements.bun,
    elements: store.elements.elements
  }))

  const dispatch = useDispatch()

  const [, dropBunRef] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch(postBunConstructor(item))
    },
  })

  const [{isHover}, dropRef] = useDrop({
    accept: ['sauce', 'main'],
    drop(item) {
      dispatch(postElementConstructor(item))
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
        ? elements.map(element => {return <Element element={element}/>})
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
          <p className='text text_type_digits-medium mr-2'>620</p>
          <CurrencyIcon type="primary"/>
        </div>        
        <Button type="primary" size="medium" onClick = {onOpen}> Оформить заказ </Button>
      </div>
  </section>
  )
})

BurgerConstructor.propTypes = {
  onOpen: PropTypes.func.isRequired
}

export default BurgerConstructor 

  // const generateUniqueKey = () => {
  //   return Math.random()
  // }
  // const elements =React.useMemo(() => {
  // return   data.filter(element => element.type !== 'bun' )
  //       .map(element => ({...element, uid: generateUniqueKey()}))
  // }, [data]) 

    // const bun = data.filter(element => element.type === 'bun' )
  // console.log(bun)