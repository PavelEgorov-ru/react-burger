import React from 'react';
import PropTypes from 'prop-types';
import styles from './TabContainer.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'


const TabContainer = ({current, onClick}) => {

  const handle = (value) => {
    onClick(value)
  }

  return (
    <div className={styles.container}>
      <Tab value="one" active={current === 'one'} onClick={handle}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={handle}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={handle}>
        Начинки
      </Tab>
    </div>
  )
}

TabContainer.propTypes = {
  current: PropTypes.string.isRequired, 
  onClick: PropTypes.func.isRequired
}
export default TabContainer