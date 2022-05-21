import { Route } from 'react-router';

export function ProtectedRoute({ children, ...rest }) {
  return <Route {...rest} render={() => children} />;
}

export default ProtectedRoute;
