import styles from './profile.module.css';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';
import MenuProfile from '../../component/MenuProfile/MenuProfile';
import FormProfile from '../../component/FormProfile/FormProfile';
import { OrderPage } from '../../pages';

export const ProfilePage = () => {
  const { url, path } = useRouteMatch();
  // console.log(url);

  return (
    <main className={cn(styles.main)}>
      <MenuProfile />
      <Switch>
        {/* <Route to={`${path}/order`} component={ <OrderPage />}} />
        <Route to={`${path}`} exact={true} render={() => <FormProfile />} /> */}

        {/* <Route to={`${path}/order`} component={OrderPage} />
        <Route to={`${path}`} exact={true} component={FormProfile} /> */}
        <Route to="">
          <FormProfile />
        </Route>
        <Route to="/order" component={<OrderPage />} />
        {/* <OrderPage />
        </Route> */}
      </Switch>
    </main>
  );
};
