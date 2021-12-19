import React from 'react';
import PropTypes from 'prop-types';
import menuElementStyles from './MenuElement.module.css';

const MenuElement = ({icon, children, classContainer, classText}) => {
  return (
    <a href="#" className={`${menuElementStyles.container} + ${classContainer 
    ? classContainer 
    : menuElementStyles.logo}`}>
      {icon}
      {children && <p className={classText}>{children}</p>}
    </a>
  )
}

MenuElement.propTypes = {
  icon: PropTypes.element.isRequired,
  children: PropTypes.string,
  classContainer: PropTypes.string,
  classText: PropTypes.string,
}

export default MenuElement