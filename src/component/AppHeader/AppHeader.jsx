import React from 'react';
import appHeaderStyles from './appHeader.module.css';
import Menu from '../menu/menu';



const AppHeader = () => {
  
  return (
    <header className={appHeaderStyles.header}>
      <Menu/>      
    </header>
  )
}

export default AppHeader 