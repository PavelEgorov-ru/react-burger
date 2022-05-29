import { Route, Redirect, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { fetchCheckUser, fetchNewToken, userActions } from '../../services/reducers';

export function ProtectedRoute({ children, ...rest }) {
  // const location = useLocation();
  const { isAuth, isLoader } = useSelector((store) => store.user);

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
