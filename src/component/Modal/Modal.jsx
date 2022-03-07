import PropTypes from 'prop-types';
import { useEffect } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("modal-root")


const Modal = ({children, title, onClose}) => {
  useEffect(() => {    
    const closeModalEsc = (event) => {
      event.key === 'Escape' && onClose();
    }
    document.addEventListener('keydown', closeModalEsc);
    return () => {
      document.removeEventListener('keydown', closeModalEsc);
    }
  }, [onClose])



  return createPortal((
    <div className={styles.window}>
      <ModalOverlay onClose = {onClose}/>
      <div className={styles.container}>
        <h2 className={`${styles.title} text text_type_main-large`}>{title}</h2>
        <button className={styles.button} onClick = {() => onClose()}>
          <CloseIcon/>
        </button>
        {children}
      </div>
    </div>    
  ), modalRoot)
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string
}

export default Modal