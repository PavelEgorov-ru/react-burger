import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';

export const LoginPage = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const inputRef = useRef();
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert(`Ваш пароль: ${formState.password}`);
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <p className="text text_type_main-medium">Вход</p>
        <div className={styles.input}>
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
        <div className={styles.input}>
          <Input
            placeholder={'Пароль'}
            icon={'HideIcon'}
            type={'password'}
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
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
        Вы - новый пользователь?
        <NavLink className={styles.link} to={{ pathname: '/register' }}>
          Зарегистрироваться
        </NavLink>
      </p>
      <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
        Забыли пароль?
        <NavLink className={styles.link} to={{ pathname: '/test' }}>
          Восстановить пароль
        </NavLink>
      </p>
    </main>
  );
};
