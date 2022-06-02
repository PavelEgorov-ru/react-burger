import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile.module.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchEditUser, fetchLogout } from '../../services/reducers';
import cn from 'classnames';
import MenuProfile from '../../component/MenuProfile/MenuProfile';
import FormProfile from '../../component/FormProfile/FormProfile';
import { OrderPage } from '../../pages';

export const ProfilePage = () => {
  const logout = () => {
    const refToken = localStorage.getItem('refBurgerToken');
    console.log('вышел из системы');
    // dispatch(fetchLogout({ token: refToken }));
  };
  return (
    <main className={cn(styles.main)}>
      <MenuProfile logout={logout} />
      <FormProfile />

      {/* <Switch>
        <Route to="/profile/order" exact>
          <OrderPage />
        </Route>
      </Switch> */}
    </main>
  );
};
