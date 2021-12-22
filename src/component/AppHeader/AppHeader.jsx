import React from 'react';
import appHeaderStyles from './AppHeader.module.css';
import Menu from '../Menu/Menu';



const AppHeader = () => {
  
  return (
    <header className={appHeaderStyles.header}>
      <Menu/>      
    </header>
  )
}

export default AppHeader 