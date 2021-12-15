
import React from 'react';

import tabContainerStyles from './tabContainer.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'


const TabContainer = (props) => {

  const handle = (value) => {
    props.onClick(value)
  }

  return (
    <div className={tabContainerStyles.container}>
      <Tab value="one" active={props.current === 'one'} onClick={handle}>
        Булки
      </Tab>
      <Tab value="two" active={props.current === 'two'} onClick={handle}>
        Соусы
      </Tab>
      <Tab value="three" active={props.current === 'three'} onClick={handle}>
        Начинки
      </Tab>
    </div>
  )
}
export default TabContainer