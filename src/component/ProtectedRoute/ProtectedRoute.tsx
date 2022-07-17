import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../hoocks';
import type { TProps } from './type';

const ProtectedRoute: React.FC<TProps> = ({ children, ...rest }) => {
  const { isAuth, isLoader } = useAppSelector((store) => store.user);

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
};

export default ProtectedRoute;
