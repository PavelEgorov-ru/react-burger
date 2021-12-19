import { useEffect } from 'react';
import PropTypes from 'prop-types';
import modalStyles from './Modal.module.css';
import { createPortal } from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';


const modalRoot = document.getElementById("modal-root")


const Modal = ({onClose, children, title}) => {  
  
  

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
    <div className={modalStyles.window}>
      <ModalOverlay onClose = {onClose}/>
      <div className={modalStyles.container}>
        <h2 className={`${modalStyles.title} text text_type_main-large`}>{title}</h2>
        <button className={modalStyles.button} onClick = {onClose}>
          <CloseIcon/>
        </button>
        {children}
      </div>
    </div>    
  ), modalRoot)
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string
}

export default Modal