import cn from 'classnames';
import styles from './order.module.css';
import { useEffect } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { fetchLogout } from '../../services/reducers';
import { useAppSelector, useAppDispatch } from '../../hoocks';
import FeedCard from '../../component/FeedCard/FeedCard';
import { wsActions } from '../../services/reducers';
import { getCookie } from '../../utils/cookie';

export const OrderPage = () => {
  const { orders } = useAppSelector((store) => store.socket);

  const ordersRevers = [...orders].reverse();

  const { url } = useRouteMatch();

  const dispatch = useAppDispatch();
  const logout = () => {
    const refToken = localStorage.getItem('refBurgerToken');
    dispatch(fetchLogout({ token: refToken }));
  };

  useEffect(() => {
    dispatch(wsActions.wsInit(`?token=${getCookie('burgerToken')}`));

    return () => {
      dispatch(wsActions.wsClose());
    };
  }, [dispatch]);

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
      <section className={cn(styles.sectionSize)}>
        <div className={cn(styles.container)}>
          {ordersRevers.map((card) => (
            <FeedCard {...card} key={card.createdAt} />
          ))}
        </div>
      </section>
    </main>
  );
};
