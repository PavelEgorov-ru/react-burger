import React from 'react';
import cn from 'classnames';
import styles from './order.module.css';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { fetchEditUser, fetchLogout } from '../../services/reducers';
import { useDispatch, useSelector } from 'react-redux';

export const OrderPage = () => {
  const { url, path } = useRouteMatch();

  const dispatch = useDispatch();
  const logout = () => {
    const refToken = localStorage.getItem('refBurgerToken');
    console.log('вышел из системы');
    dispatch(fetchLogout({ token: refToken }));
  };

  return (
    <main className={cn(styles.main)}>
      <nav className={cn(styles.nav)}>
        <NavLink className={styles.link} to={{ pathname: '/profile' }}>
          <p className={cn('text text_type_main-medium')}>Профиль</p>
        </NavLink>
        <NavLink className={styles.link_active} to={{ pathname: `${url}` }}>
          <p className={cn('text text_type_main-medium')}>История заказов</p>
        </NavLink>
        <NavLink className={styles.link} to={{ pathname: '/login' }} onClick={logout}>
          <p className={cn('text text_type_main-medium')}>Выход</p>
        </NavLink>

        <p className={cn(`text text_type_main-small text_color_inactive ${styles.text}`)}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <div className={cn(styles.form)}>страница с итсориями заказов</div>
    </main>
  );
};
