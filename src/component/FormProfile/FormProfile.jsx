import styles from './FormProfile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Switch, Route } from 'react-router-dom';
import { fetchEditUser, fetchLogout } from '../../services/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import cn from 'classnames';

const FormProfile = () => {
  const { userName, userEmail, userPassword } = useSelector((store) => store.user);
  const [formState, setFormState] = useState({
    name: userName,
    email: userEmail,
    password: userPassword,
  });

  const [isEditName, setEditName] = useState(false);
  const [isEditEmail, setEditEmail] = useState(false);
  const [isEditPassword, setEditPassword] = useState(false);

  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const dispatch = useDispatch();

  const onClickNameIcon = () => {
    setTimeout(() => inputNameRef.current.focus(), 0);
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
    setTimeout(() => inputEmailRef.current.focus(), 0);
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
    setTimeout(() => inputPasswordRef.current.focus(), 0);
    setEditPassword(!isEditPassword);
    setEditEmail(false);
    setEditName(false);
    if (isEditPassword) {
      setFormState({
        ...formState,
        password: userPassword,
      });
    }
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

  const cancelSend = (e) => {
    e.preventDefault();
    setFormState({
      name: userName,
      email: userEmail,
      password: userPassword,
    });
    setEditEmail(false);
    setEditPassword(false);
    setEditName(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(fetchEditUser(formState));
    setEditEmail(false);
    setEditPassword(false);
    setEditName(false);
  };

  // const logout = () => {
  //   const refToken = localStorage.getItem('refBurgerToken');
  //   console.log('вышел из системы');
  //   dispatch(fetchLogout({ token: refToken }));
  // };

  return (
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
          value={formState.name}
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
          value={formState.email}
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
  );
};

export default FormProfile;
