import { Route, Redirect } from 'react-router';
import { getCookie, setCookie } from '../../utils/cookie';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCheckUser } from '../../services/reducers';

export function ProtectedRoute({ children, isAuth, ...rest }) {
  console.log(isAuth);
  useEffect(() => {
    console.log('монтирование');
  }, []);

  useEffect(() => {
    console.log('изменение флага');
  }, [isAuth]);

  return (
    <Route
      {...rest}
      render={() => {
        if (isAuth) {
          console.log(isAuth);
          return { children };
        } else {
          console.log(isAuth);
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default ProtectedRoute;

// const dispatch = useDispatch();

// const { isAuth } = useSelector((store) => store.user);
// const [isAuthUser, setIsAuthUser] = useState(false);
// dispatch(fetchCheckUser());
// console.log('1111');
// const auth = () => {
//   if (getCookie('burgerToken')) {
//     // console.log(!!getCookie('burgerToken'));
//     dispatch(fetchCheckUser());
//     // setIsAuthUser(true);
//   }
// };

// console.log(isAuthUser);

// useEffect(() => {
//   // console.log('вызвался запрос юзера');
//   auth();
// }, []);

// console.log(isAuth);
