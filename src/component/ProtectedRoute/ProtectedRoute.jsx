import { Route, Redirect, useLocation } from 'react-router';
import { getCookie, setCookie } from '../../utils/cookie';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCheckUser, userActions } from '../../services/reducers';

export function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  // const location = useLocation();
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

  // if (isAuth) {
  //   // return <Redirect to={location.state?.from || '/'} />;
  // }

  return (
    isLoader && (
      <Route
        {...rest}
        render={({ location }) => {
          console.log('локация', location);
          if (isAuth) {
            // return location.state?.form ? <Redirect to="/" /> : children;
            return children;
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/login',
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
