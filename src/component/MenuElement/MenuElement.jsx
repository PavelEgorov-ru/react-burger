import React from 'react';
import menuElementStyles from './MenuElement.module.css';

const MenuElement = (props) => {
  return (
    <a className={`${menuElementStyles.container} + ${props.classContainer 
    ? props.classContainer 
    : menuElementStyles.logo}`}>
      {props.icon}
      {props.children && <p href="#" className={`${props.classText} + ${menuElementStyles.link}`}>{props.children}</p>}
    </a>
  )
}

export default MenuElement