import PropTypes from 'prop-types';
import { useEffect } from 'react';
import cn from 'classnames';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, title, onClose }) => {
  const history = useHistory();

  const onCloseModal = () => {
    if (onClose) {
      onClose();
    } else {
      history.goBack();
    }
  };

  useEffect(() => {
    const closeModalEsc = (event) => {
      event.key === 'Escape' && onCloseModal();
    };

    document.addEventListener('keydown', closeModalEsc);
    return () => {
      document.removeEventListener('keydown', closeModalEsc);
    };
  }, [onClose]);

  return createPortal(
    <div className={cn(styles.window)}>
      <ModalOverlay onClose={onClose} />
      <div className={cn(styles.container)}>
        <h2 className={cn(`${styles.title} text text_type_main-large`)}>{title}</h2>
        <button className={cn(styles.button)} onClick={() => onCloseModal()}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
