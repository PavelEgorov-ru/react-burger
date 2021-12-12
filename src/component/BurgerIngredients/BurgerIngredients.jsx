import React from 'react';
import PropTypes from 'prop-types';
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
      <div className={burgerIngredientsStyles.container}>
        <ItemsContainer key={1} data = {data.filter(item => item.type === 'bun')}> Булки </ItemsContainer>
        <ItemsContainer key={2}data = {data.filter(item => item.type === 'sauce')}> Соус </ItemsContainer>
        <ItemsContainer key={3}data = {data.filter(item => item.type === 'main')}> Мясо </ItemsContainer> 
      </div>           
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  )
}






export default BurgerIngredients 