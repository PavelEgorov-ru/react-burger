import React, { useState, useRef, useCallback } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchAuth } from '../../services/reducers';
import { getCookie } from '../../utils/cookie';
import cn from 'classnames';
import styles from './login.module.css';

export const LoginPage = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [isActiveIcon, setIsActiveIcon] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const inputRef = useRef();

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
    e.preventDefault();
    dispatch(fetchAuth(formState));
    setFormState({
      email: '',
      password: '',
    });
    history.replace({ pathname: '/' });
  };

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
