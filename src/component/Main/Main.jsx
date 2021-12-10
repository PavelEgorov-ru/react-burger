import React from 'react';
import mainStyles from './Main.module.css'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

const Main = (props) => {
  
  return (
    <main className={mainStyles.main}>
      <BurgerConstructor/>
      <BurgerIngredients data = {props.data}/>
    </main>
  )
}

export default Main