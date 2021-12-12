import React from 'react';
import '@ya.praktikum/react-developer-burger-ui-components';


import appStyles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import data from '../../utils/data'


const App = () => {
  return (
    <div className={appStyles.App}>
      <AppHeader/>
      <Main data = {data} />
    </div>
  );
}

export default App;
