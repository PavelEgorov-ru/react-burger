import React from 'react';
import cn from 'classnames';
import styles from './order.module.css';
import { NavLink, useParams, useRouteMatch } from 'react-router-dom';
import { fetchEditUser, fetchLogout } from '../../services/reducers';
import { useDispatch, useSelector } from 'react-redux';

export const OrderPage = () => {
  let { pageId } = useParams();
  console.log(pageId);

  return <div>история заказов</div>;
};
