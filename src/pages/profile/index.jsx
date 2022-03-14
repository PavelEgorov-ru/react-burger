import React, { useState, useRef } from 'react';
import styles from './profile.module.css';
import { NavLink } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

export const ProfilePage = () => {
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
    <main className={cn(styles.main)}>
      <nav className={cn(styles.nav)}>
        <NavLink className={styles.link_active} to={{ pathname: '/' }}>
          <p className={cn('text text_type_main-medium')}>Профиль</p>
        </NavLink>
        <NavLink className={styles.link} to={{ pathname: '/' }}>
          <p className={cn('text text_type_main-medium')}>История заказов</p>
        </NavLink>
        <NavLink className={styles.link} to={{ pathname: '/login' }}>
          <p className={cn('text text_type_main-medium')}>Выход</p>
        </NavLink>
        <p className={cn(`text text_type_main-small text_color_inactive ${styles.text}`)}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <form className={cn(styles.form)}>
        <div className={cn(styles.input)}>
          <Input
            placeholder={'Имя'}
            icon={'EditIcon'}
            type={'text'}
            onChange={handleInputChange}
            value={formState.name}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={cn(styles.input)}>
          <Input
            placeholder={'Логин'}
            icon={'EditIcon'}
            type={'email'}
            onChange={handleInputChange}
            value={formState.email}
            name={'email'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={cn(styles.input)}>
          <Input
            placeholder={'Пароль'}
            icon={'EditIcon'}
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
      </form>
    </main>
  );
};
