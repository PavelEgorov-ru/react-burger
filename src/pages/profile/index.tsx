import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hoocks';
import styles from './profile.module.css';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchEditUser, fetchLogout } from '../../services/reducers';
import cn from 'classnames';

export const ProfilePage = () => {
  const { url } = useRouteMatch();

  const { userName, userEmail } = useAppSelector((store) => store.user);
  const [formState, setFormState] = useState({
    name: userName,
    email: userEmail,
    password: '',
  });

  const [isEditName, setEditName] = useState(false);
  const [isEditEmail, setEditEmail] = useState(false);
  const [isEditPassword, setEditPassword] = useState(false);

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const onClickNameIcon = () => {
    setTimeout(() => inputNameRef.current?.focus(), 0);
    setEditName(!isEditName);
    setEditEmail(false);
    setEditPassword(false);
    if (isEditName) {
      setFormState({
        ...formState,
        name: userName,
      });
    }
  };

  const onClickEmailIcon = () => {
    setTimeout(() => inputEmailRef.current?.focus(), 0);
    setEditEmail(!isEditEmail);
    setEditName(false);
    setEditPassword(false);
    if (isEditEmail) {
      setFormState({
        ...formState,
        email: userEmail,
      });
    }
  };

  const onClickPasswordEmail = () => {
    setTimeout(() => inputPasswordRef.current?.focus(), 0);
    setEditPassword(!isEditPassword);
    setEditEmail(false);
    setEditName(false);
    if (isEditPassword) {
      setFormState({
        ...formState,
        password: '',
      });
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const cancelSend = (event: FormEvent) => {
    event.preventDefault();
    setFormState({
      name: userName,
      email: userEmail,
      password: '',
    });
    setEditEmail(false);
    setEditPassword(false);
    setEditName(false);
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    dispatch(fetchEditUser(formState));
    setEditEmail(false);
    setEditPassword(false);
    setEditName(false);
  };

  const logout = () => {
    const refToken = localStorage.getItem('refBurgerToken');
    dispatch(fetchLogout({ token: refToken }));
  };

  return (
    <main className={cn(styles.main)}>
      <nav className={cn(styles.nav)}>
        <NavLink className={styles.link_active} to={{ pathname: `${url}` }}>
          <p className={cn('text text_type_main-medium')}>Профиль</p>
        </NavLink>
        <NavLink className={styles.link} to={{ pathname: `${url}/orders` }}>
          <p className={cn('text text_type_main-medium')}>История заказов</p>
        </NavLink>
        <NavLink className={styles.link} to={{ pathname: '/login' }} onClick={logout}>
          <p className={cn('text text_type_main-medium')}>Выход</p>
        </NavLink>

        <p className={cn(`text text_type_main-small text_color_inactive ${styles.text}`)}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <form className={cn(styles.form)} onSubmit={submitForm}>
        <div
          className={cn(styles.input, {
            [styles.activeInput]: isEditName,
          })}
        >
          <Input
            placeholder={'Имя'}
            icon={isEditName ? 'CloseIcon' : 'EditIcon'}
            type={'text'}
            onChange={handleInputChange}
            value={formState.name ? formState.name : ''}
            name={'name'}
            error={false}
            ref={inputNameRef}
            onIconClick={onClickNameIcon}
            errorText={'Ошибка'}
            size={'default'}
            disabled={isEditName ? false : true}
          />
        </div>
        <div
          className={cn(styles.input, {
            [styles.activeInput]: isEditEmail,
          })}
        >
          <Input
            placeholder={'Логин'}
            icon={isEditEmail ? 'CloseIcon' : 'EditIcon'}
            type={'email'}
            onChange={handleInputChange}
            value={formState.email ? formState.email : ''}
            name={'email'}
            error={false}
            ref={inputEmailRef}
            onIconClick={onClickEmailIcon}
            errorText={'Ошибка'}
            size={'default'}
            disabled={isEditEmail ? false : true}
          />
        </div>
        <div
          className={cn(styles.input, {
            [styles.activeInput]: isEditPassword,
          })}
        >
          <Input
            placeholder={'Пароль'}
            icon={isEditPassword ? 'CloseIcon' : 'EditIcon'}
            type={'password'}
            onChange={handleInputChange}
            value={formState.password}
            name={'password'}
            error={false}
            ref={inputPasswordRef}
            onIconClick={onClickPasswordEmail}
            errorText={'Ошибка'}
            size={'default'}
            disabled={isEditPassword ? false : true}
          />
        </div>
        {(isEditName || isEditEmail || isEditPassword) && (
          <div className={cn(styles.buttons)}>
            <Button type="secondary" size="medium" onClick={cancelSend}>
              Отмена
            </Button>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </main>
  );
};
