import React from 'react';
import menuStyles from './Menu.module.css';
import MenuElement from '../MenuElement/MenuElement';
import {Logo, BurgerIcon, ProfileIcon, ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';


const Menu = () => {

  const burgerIcon = <BurgerIcon type="primary"/>
  const profileIcon = <ProfileIcon type="secondary"/>
  const logo = <Logo/>
  const listIcon = <ListIcon type="secondary"/>
  

  return (
    <nav>
      <ul className={menuStyles.list}>
        <MenuElement icon ={burgerIcon} classText="text text_type_main-default pl-2"
        classContainer="p-5 mt-4 mb-4">
          Конструктор
        </MenuElement>
        <MenuElement icon={listIcon} classText="
        text text_type_main-default pl-2
        text_color_inactive"
        classContainer="p-5 mt-4 mb-4 ml-2">
          Лента заказов
        </MenuElement>
        <MenuElement icon={logo}/>
        <MenuElement icon={profileIcon} classText="
        text text_type_main-default pl-2 
        text_color_inactive"
        classContainer="p-5 mt-4 mb-4">
          Личный кабинет
        </MenuElement>
      </ul>
    </nav>
  )
}

export default Menu;