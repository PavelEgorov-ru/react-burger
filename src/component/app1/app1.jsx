import React from 'react';
import '@ya.praktikum/react-developer-burger-ui-components';


import appStyles from './app1.module.css'
import AppHeader from '../appHeader1/appHeader1';
import Main from '../main1/main1';
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
