import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children, ...rest }) {
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

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};

export default ProtectedRoute;
