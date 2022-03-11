import styles from './Menu.module.css';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import {Logo, BurgerIcon, ProfileIcon, ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const Menu = () => {

  return (
    <nav>
      <ul className={cn(styles.list)}>
        <NavLink className={cn(`p-5 mt-4 mb-4 ${styles.container}`)} to = {{ pathname: '/' }}>
          <BurgerIcon type="primary"/>
          <p className={cn('text text_type_main-default pl-2')}>Конструктор</p>
        </NavLink>
        <NavLink className={cn(`p-5 mt-4 mb-4 ml-2 ${styles.container}`)} to = {{ pathname: '/2' }}>
          <ListIcon type="secondary"/>
          <p className={cn('text text_type_main-default pl-2 text_color_inactive')}>Лента заказов</p>
        </NavLink>
        <NavLink className={cn(`${styles.logo} ${styles.container}`)} to = {{ pathname: '/' }}>
          <Logo/>
        </NavLink>
        <NavLink className={cn(`p-5 mt-4 mb-4 ${styles.container}`)} to = {{ pathname: '/4' }}>
          <ProfileIcon type="secondary"/>
          <p className={cn('text text_type_main-default pl-2 text_color_inactive')}>Личный кабинет</p>
        </NavLink>
      </ul>
    </nav>
  )
}

export default Menu;
