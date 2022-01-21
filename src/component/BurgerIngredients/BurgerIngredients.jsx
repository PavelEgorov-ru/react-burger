import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';
import TabContainer from '../TabContainer/TabContainer';
import ItemsContainer from '../ItemsContainer/ItemsContainer';
import typeIndegrient from '../../utils/types';

const BurgerIngredients = ({data, onOpen}) => {

  const [current, setCurrent] = React.useState('one')
  const handleCurrent = (value) => {
    setCurrent(value)
  }
  const generateUniqueKey = () => {
    return Math.random()
  }
  const buns = React.useMemo(() => {
   return data.filter(element => element.type === 'bun' )
        .map(element => ({...element, uid: generateUniqueKey()}))
      }, [data]
  )
  
  const sauces = React.useMemo(() => {
   return data.filter(element => element.type === 'sauce' )
      .map(element => ({...element, uid: generateUniqueKey()}))
  }, [data]
  ) 

  const mains =  React.useMemo(() => {
   return data.filter(element => element.type === 'main' )
    .map(element => ({...element, uid: generateUniqueKey()}))
  }, [data]
  )
  
  return (
     <section className={styles.sectionSize} >
      <h1 className="text text_type_main-large mt-10 mb-5">
        Соберите бургер
      </h1>
      <TabContainer current = {current} onClick = {handleCurrent} />
      <div className={styles.container}>
        <ItemsContainer key={1} data = {buns} onOpen={onOpen}> Булки </ItemsContainer>
        <ItemsContainer key={2} data = {sauces} onOpen={onOpen}> Соус </ItemsContainer>
        <ItemsContainer key={3} data = {mains} onOpen={onOpen}> Мясо </ItemsContainer> 
      </div>           
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape(typeIndegrient),    
  ).isRequired, 
  onOpen: PropTypes.func.isRequired
}

export default BurgerIngredients