import React from 'react';
import appHeaderStyles from './appHeader1.module.css';
import Menu from '../menu1/menu1';



const AppHeader = () => {
  
  return (
    <header className={appHeaderStyles.header}>
      <Menu/>      
    </header>
  )
}

export default AppHeader 