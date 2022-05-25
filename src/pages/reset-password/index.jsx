import React, { useState, useRef, useCallback } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchNewUser } from '../../services/reducers';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import styles from './reset.module.css';

export const ResetPage = () => {
  const [formState, setFormState] = useState({
    code: '',
    password: '',
  });
  const [isActiveIcon, setIsActiveIcon] = useState(false);

  const inputRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setIsActiveIcon(!isActiveIcon);
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

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(fetchNewUser(formState));
    setFormState({
      code: '',
      password: '',
    });
    history.replace({ pathname: '/login' });
  };

  return (
    <main className={cn(styles.main)}>
      <form className={cn(styles.form)} onSubmit={submitForm}>
        <p className={cn('text text_type_main-medium')}>Восстановление пароля</p>
        <div className={cn(styles.input)}>
          <Input
            placeholder={'Введите новый пароль'}
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
        <Button type="primary" htmlType="submit" size="medium">
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