import PropTypes from 'prop-types';
import { useEffect } from 'react';
import cn from 'classnames';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import type { TProps } from './type';

const Modal: React.FC<TProps> = ({ children, title, onClose }) => {
  const modalRoot: HTMLElement | null = document.getElementById('modal-root');
  const history = useHistory();

  const onCloseModal = () => {
    if (onClose) {
      onClose();
    } else {
      history.goBack();
    }
  };

  useEffect(() => {
    const closeModalEsc = (event: KeyboardEvent) => {
      event.key === 'Escape' && onCloseModal();
    };

    document.addEventListener('keydown', closeModalEsc);
    return () => {
      document.removeEventListener('keydown', closeModalEsc);
    };
  }, [onClose]);

  return (
    modalRoot &&
    createPortal(
      <div className={cn(styles.window)}>
        <ModalOverlay onClose={onCloseModal} />
        <div className={cn(styles.container)}>
          <h2 className={cn(`${styles.title} text text_type_main-large`)}>{title}</h2>
          <button className={cn(styles.button)} onClick={() => onCloseModal()}>
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </div>,
      modalRoot
    )
  );
};

export default Modal;
