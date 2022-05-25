import { Route, Redirect } from 'react-router';
import { getCookie, setCookie } from '../../utils/cookie';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCheckUser, userActions } from '../../services/reducers';

export function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const { isAuth, isLoader } = useSelector((store) => store.user);

  const auth = () => {
    if (getCookie('burgerToken')) {
      dispatch(fetchCheckUser());
    } else {
      dispatch(userActions.endLoader());
    }
  };

  useEffect(() => {
    auth();
  }, []);

  if (!isLoader) return <div>загрузка данных</div>;

  return (
    isLoader && (
      <Route
        {...rest}
        render={({ location }) => {
          if (isAuth) {
            return children;
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: location },
                }}
              />
            );
          }
        }}
      />
    )
  );
}

export default ProtectedRoute;
