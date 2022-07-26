import { useState, ChangeEvent } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hoocks';
import { fetchForgotPassword } from '../../services/reducers';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import styles from './forgot.module.css';

export const ForgotPage = () => {
  const [formState, setFormState] = useState({
    email: '',
  });

  const { isForgot, isLoader, isAuth } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const submitForm = () => {
    dispatch(fetchForgotPassword(formState));
    setFormState({
      email: '',
    });
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  if (isForgot) {
    return <Redirect to="/reset-password" />;
  }

  if (!isLoader) return <div>загрузка данных</div>;

  return (
    <main className={cn(styles.main)}>
      <form className={cn(styles.form)} onSubmit={submitForm}>
        <p className={cn('text text_type_main-medium')}>Восстановление пароля</p>
        <div className={cn(styles.input)}>
          <Input
            placeholder={'Укажите ваш e-mail'}
            type={'email'}
            onChange={handleInputChange}
            value={formState.email}
            name={'email'}
            error={false}
            // ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <Button type="primary" htmlType="submit" size="medium">
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
