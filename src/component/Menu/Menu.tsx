import styles from './Menu.module.css';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hoocks';
import cn from 'classnames';
import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const Menu = () => {
  const { userName } = useAppSelector((store) => store.user);

  return (
    <nav>
      <ul className={cn(styles.list)}>
        <NavLink
          activeClassName={cn(styles.activeContainer)}
          className={cn(`p-5 mt-4 mb-4 ${styles.container}`)}
          exact
          to={{ pathname: '/' }}
        >
          <BurgerIcon type="secondary" />
          <p className={cn('text text_type_main-default pl-2')}>Конструктор</p>
        </NavLink>
        <NavLink
          activeClassName={cn(styles.activeContainer)}
          className={cn(`p-5 mt-4 mb-4 ml-2 ${styles.container}`)}
          to={{ pathname: '/feed' }}
        >
          <ListIcon type="secondary" />
          <p className={cn('text text_type_main-default pl-2')}>Лента заказов</p>
        </NavLink>
        <NavLink className={cn(`${styles.logo} ${styles.container}`)} to={{ pathname: '/' }}>
          <Logo />
        </NavLink>
        <NavLink
          activeClassName={cn(styles.activeContainer)}
          className={cn(`p-5 mt-4 mb-4 ${styles.container}`)}
          to={{ pathname: '/profile' }}
        >
          <ProfileIcon type="secondary" />
          <p className={cn('text text_type_main-default pl-2')}>
            {userName !== '' ? userName : 'Личный кабинет'}
          </p>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Menu;
