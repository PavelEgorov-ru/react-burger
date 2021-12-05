import React from 'react';
import menuElementStyles from './MenuElement.module.css';

const MenuElement = (props) => {
  return (
    <li className={`${menuElementStyles.container} + ${props.classContainer ? props.classContainer : menuElementStyles.logo}`}>
      {props.icon}
      {props.children && <p className={props.classText}>{props.children}</p>}
    </li>
  )
}

export default MenuElement