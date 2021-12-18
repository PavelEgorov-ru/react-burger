import React from 'react';
import menuElementStyles from './MenuElement.module.css';

const MenuElement = (props) => {
  return (
    <a href="#" className={`${menuElementStyles.container} + ${props.classContainer 
    ? props.classContainer 
    : menuElementStyles.logo}`}>
      {props.icon}
      {props.children && <p className={`${props.classText} + ${menuElementStyles.link}`}>{props.children}</p>}
    </a>
  )
}

export default MenuElement