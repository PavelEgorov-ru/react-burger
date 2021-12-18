import React from 'react';
import appHeaderStyles from './AppHeader.module.css';
import Menu from '../Menu/Menu';



const AppHeader = (props) => {
  
  return (
    <header className={appHeaderStyles.header} onClick={props.onOpen}>
      <Menu/>      
    </header>
  )
}

export default AppHeader 