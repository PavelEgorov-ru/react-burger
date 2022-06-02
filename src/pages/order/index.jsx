import React from 'react';
import cn from 'classnames';
import styles from './order.module.css';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { fetchEditUser, fetchLogout } from '../../services/reducers';
import { useDispatch, useSelector } from 'react-redux';

export const OrderPage = () => {
  const { url } = useRouteMatch();
  console.log(url);

  return <div>история заказов</div>;
};
