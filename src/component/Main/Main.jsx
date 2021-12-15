import React from 'react';
import mainStyles from './main.module.css'
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';

const Main = (props) => {
  
  return (
    <main className={mainStyles.main}>
      <BurgerIngredients data = {props.data}/>
      <BurgerConstructor data = {props.data}/>      
    </main>
  )
}

export default Main