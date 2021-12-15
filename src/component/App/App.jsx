import React, { useState, useEffect} from 'react';
import '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import newApi from '../../utils/api';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';



const App = () => {
  const [indegrients, setIndegrients] = useState([])

  React.useEffect(() => {
    newApi.getIdegrients()
    .then((indegrientData) => {
      setIndegrients(indegrientData.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <div className={appStyles.App}>
      <AppHeader/>
      {indegrients.length !== 0 && <main className={appStyles.main}>
        <BurgerIngredients data = {indegrients}/>
        <BurgerConstructor data = {indegrients}/> 
      </main>}
    </div>
  );
}

export default App;
