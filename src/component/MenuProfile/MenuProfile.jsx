import styles from './MenuProfile.module.css';
import { NavLink } from 'react-router-dom';
import '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

const MenuProfile = ({ logout }) => {
  return (
    <nav className={cn(styles.nav)}>
      <NavLink
        activeClassName={styles.link_active}
        className={styles.link}
        to={{ pathname: '/profile' }}
      >
        <p className={cn('text text_type_main-medium')}>Профиль</p>
      </NavLink>
      <NavLink
        activeClassName={styles.link_active}
        className={styles.link}
        to={{ pathname: '/profile/order' }}
      >
        <p className={cn('text text_type_main-medium')}>История заказов</p>
      </NavLink>
      <NavLink
        activeClassName={styles.link_active}
        className={styles.link}
        to={{ pathname: '/login' }}
        onClick={logout}
      >
        <p className={cn('text text_type_main-medium')}>Выход</p>
      </NavLink>

      <p className={cn(`text text_type_main-small text_color_inactive ${styles.text}`)}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
};

export default MenuProfile;
