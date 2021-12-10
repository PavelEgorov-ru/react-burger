import React from 'react';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import TabContainer from '../TabContainer/TabContainer';
import ItemsContainer from '../ItemsContainer/ItemsContainer';

const BurgerIngredients = ({data}) => {
  
  const [current, setCurrent] = React.useState('one')

  const handleCurrent = (value) => {
    setCurrent(value)
  }
  
  return (
     <section className={burgerIngredientsStyles.sectionSize}>
      <h1 className="text text_type_main-large mt-10 mb-5">
        Соберите бургер
      </h1>
      <TabContainer current = {current} onClick = {handleCurrent}/>
      <ItemsContainer data = {data.filter(item => item.type === 'bun')}> Булки </ItemsContainer>
      <ItemsContainer data = {data.filter(item => item.type === 'sauce')}> Соус </ItemsContainer>
      <ItemsContainer data = {data.filter(item => item.type === 'main')}> Мясо </ItemsContainer>

    </section>
  )
}

export default BurgerIngredients 