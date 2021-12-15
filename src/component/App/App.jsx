import React from 'react';
import '@ya.praktikum/react-developer-burger-ui-components';


import appStyles from './app.module.css'
import AppHeader from '../appHeader/appHeader';
import Main from '../main/main';
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
