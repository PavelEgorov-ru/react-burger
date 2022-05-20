import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import styles from './forgot.module.css';

export const ForgotPage = () => {
  const [formState, setFormState] = useState({
    email: '',
  });
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

  return (
    <main className={cn(styles.main)}>
      <form className={cn(styles.form)}>
        <p className={cn('text text_type_main-medium')}>Восстановление пароля</p>
        <div className={cn(styles.input)}>
          <Input
            placeholder={'Укажите ваш e-mail'}
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
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <p className={cn(`text text_type_main-default text_color_inactive ${styles.text}`)}>
        Вспомнили пароль?
        <NavLink className={cn(styles.link)} to={{ pathname: '/login' }}>
          Войти
        </NavLink>
      </p>
    </main>
  );
};
