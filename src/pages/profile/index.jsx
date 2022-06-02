import React from 'react';
import styles from './profile.module.css';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';
import MenuProfile from '../../component/MenuProfile/MenuProfile';
import FormProfile from '../../component/FormProfile/FormProfile';
import { OrderPage } from '../../pages';
import { useEffect } from 'react';

export const ProfilePage = React.memo(() => {
  useEffect(() => {
    console.log('рендер');
  });
  const { url } = useRouteMatch();
  console.log(url);
  return (
    <main className={cn(styles.main)}>
      <MenuProfile />
      {/* первый вариант */}
      {url === '/profile/*' && <FormProfile />}
      {url === '/profile/order' && <OrderPage />}

      {/* второй вариант */}
      {/* <Switch>
        <Route to={url === '/profile/*' && `${url}`}>
          <FormProfile />
        </Route>
        <Route to={url === '/profile/order' && `${url}`}>
          <OrderPage />
        </Route>
      </Switch> */}

      {/* третий вариант */}
      {/* <Switch>
        <Route to="/profile/*">
          <FormProfile />
        </Route>
        <Route to="/profile/order">
          <OrderPage />
        </Route>
      </Switch> */}
    </main>
  );
});
