import React, { useState, useRef, useCallback } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import styles from './reset.module.css';

export const ResetPage = () => {
  const [formState, setFormState] = useState({
    code: '',
    password: '',
  });

  const inputRef = useRef();
  const history = useHistory();

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

  const save = useCallback(() => {
    history.replace({ pathname: '/login' });
  }, [history]);

  return (
    <main className={cn(styles.main)}>
      <form className={cn(styles.form)}>
        <p className={cn('text text_type_main-medium')}>Восстановление пароля</p>
        <div className={cn(styles.input)}>
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
        <div className={cn(styles.input)}>
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
        <Button type="primary" size="medium" onClick={save}>
          Сохранить
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
