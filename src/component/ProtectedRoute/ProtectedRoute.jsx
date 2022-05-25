import { Route, Redirect } from 'react-router';
import { getCookie, setCookie } from '../../utils/cookie';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCheckUser } from '../../services/reducers';

export function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const { isAuth, isLoader } = useSelector((store) => store.user);

  const auth = () => {
    if (getCookie('burgerToken')) {
      dispatch(fetchCheckUser());
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
        render={() => {
          if (isAuth) {
            return children;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    )
  );
}

export default ProtectedRoute;
