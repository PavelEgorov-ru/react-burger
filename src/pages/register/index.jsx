import React, { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import cn from 'classnames';
import styles from './register.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCookie } from '../../utils/cookie';
import { fetchNewUser } from '../../services/reducers';

export const RegisterPage = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: '',
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

  // const submitForm = (event) => {
  //   console.log(formState);
  //   event.preventDefault();
  //   dispatch(fetchNewUser(formState));
  //   // setFormState({
  //   //   email: '',
  //   //   password: '',
  //   //   name: '',
  //   // });
  // };

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setIsActiveIcon(!isActiveIcon);
  };

  const registration = (e) => {
    e.preventDefault();
    console.log(formState);
    dispatch(fetchNewUser(formState));
    history.replace({ pathname: '/login' });
  };

  // console.log(getCookie('burgerToken'));
  // console.log(localStorage.getItem('refBurgerToken'));

  return (
    <main className={cn(styles.main)}>
      <form className={cn(styles.form)} onSubmit={registration}>
        <p className={cn('text text_type_main-medium')}>Регистрация</p>
        <div className={cn(styles.input)}>
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
          Зарегистрироваться
        </Button>
      </form>
      <p className={cn(`text text_type_main-default text_color_inactive ${styles.text}`)}>
        Уже зарегитсрированны?
        <NavLink className={cn(styles.link)} to={{ pathname: '/login' }}>
          Войти
        </NavLink>
      </p>
    </main>
  );
};