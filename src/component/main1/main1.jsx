import React from 'react';
import mainStyles from './main1.module.css'
import BurgerConstructor from '../burgerConstructor1/burgerConstructor1';
import BurgerIngredients from '../burgerIngredients1/burgerIngredients1';

const Main = (props) => {
  
  return (
    <main className={mainStyles.main}>
      <BurgerIngredients data = {props.data}/>
      <BurgerConstructor data = {props.data}/>      
    </main>
  )
}

export default Main