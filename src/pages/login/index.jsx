import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCookie } from '../../utils/cookie';
import { fetchAuth, fetchCheckUser, userActions } from '../../services/reducers';
import cn from 'classnames';
import styles from './login.module.css';

export const LoginPage = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [isActiveIcon, setIsActiveIcon] = useState(false);
  const { isAuth, isLoader } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const history = useHistory();
  const inputRef = useRef();

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

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setIsActiveIcon(!isActiveIcon);
  };

  const login = (e) => {
    dispatch(fetchAuth(formState));
    console.log(formState);
    setFormState({
      email: '',
      password: '',
    });
    history.replace({ pathname: '/' });
  };

  if (isAuth) {
    console.log(isAuth);
    return <Redirect to="/" />;
  }

  if (!isLoader) return <div>загрузка данных</div>;

  return (
    <main className={cn(styles.main)}>
      <form className={cn(styles.form)} onSubmit={login}>
        <p className="text text_type_main-medium">Вход</p>
        <div className={cn(styles.input)}>
          <Input
            placeholder={'Email'}
            type={'email'}
            onChange={handleInputChange}
            value={formState.email}
            name={'email'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={cn(styles.input)}>
          <Input
            placeholder={'Пароль'}
            icon={isActiveIcon ? 'ShowIcon' : 'HideIcon'}
            type={isActiveIcon ? 'text' : 'password'}
            onChange={handleInputChange}
            value={formState.password}
            name={'password'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <Button type="primary" htmlType="submit" size="medium">
          Войти
        </Button>
      </form>
      <p className={cn(`text text_type_main-default text_color_inactive ${styles.text}`)}>
        Вы - новый пользователь?
        <NavLink className={cn(styles.link)} to={{ pathname: '/register' }}>
          Зарегистрироваться
        </NavLink>
      </p>
      <p className={cn(`text text_type_main-default text_color_inactive ${styles.text}`)}>
        Забыли пароль?
        <NavLink className={styles.link} to={{ pathname: '/forgot-password' }}>
          Восстановить пароль
        </NavLink>
      </p>
    </main>
  );
};
