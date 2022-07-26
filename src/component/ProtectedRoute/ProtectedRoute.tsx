import { Route, Redirect } from 'react-router';
import { useAppSelector } from '../../hoocks';
import { RouteProps } from 'react-router-dom';

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
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
