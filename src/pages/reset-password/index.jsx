import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset.module.css';

export const ResetPage = () => {
  const [formState, setFormState] = useState({
    code: '',
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
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <div className={styles.input}>
          <Input
            placeholder={'Введите новый пароль'}
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
        <div className={styles.input}>
          <Input
            placeholder={'Введите код из письма'}
            type={'text'}
            onChange={handleInputChange}
            value={formState.name}
            name={'code'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
        Вспомнили пароль?
        <NavLink className={styles.link} to={{ pathname: '/login' }}>
          Войти
        </NavLink>
      </p>
    </main>
  );
};
