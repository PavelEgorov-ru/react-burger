import { useState, useRef, ChangeEvent, FormEventHandler } from 'react';
import { NavLink, Redirect, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hoocks';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchAuth, userActions } from '../../services/reducers';
import cn from 'classnames';
import styles from './login.module.css';

export const LoginPage = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [isActiveIcon, setIsActiveIcon] = useState(false);
  const { isAuth, isLoader, isReset } = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation<any>();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  if (isReset) {
    dispatch(userActions.defaultReset());
  }

  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
    setIsActiveIcon(!isActiveIcon);
  };

  const submitForm = () => {
    dispatch(fetchAuth(formState));
    setFormState({
      email: '',
      password: '',
    });
  };

  if (isAuth) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  if (!isLoader) return <div>загрузка данных</div>;

  return (
    <main className={cn(styles.main)}>
      <form className={cn(styles.form)} onSubmit={submitForm}>
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
