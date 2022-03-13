import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const LoginPage = () => {
  const [formState, setFormState] = useState({
    name: '',
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
      <form className={styles.container}>
        <p className="text text_type_main-medium">Регистрация</p>
        <div className={styles.input}>
          <Input
            placeholder={'Имя'}
            type={'text'}
            onChange={handleInputChange}
            value={formState.name}
            name={'name'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
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
          Зарегистрироваться
        </Button>
      </form>
      <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
        Уже зарегитсрированны?
        <NavLink className={styles.link} to={{ pathname: '/test' }}>
          Войти
        </NavLink>
      </p>
    </main>
  );
};
