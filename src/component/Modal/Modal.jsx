import { useEffect } from 'react';
import PropTypes from 'prop-types';
import modalStyles from './Modal.module.css';
import { createPortal } from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';


const modalRoot = document.getElementById("modal-root")


const Modal = ({onClose, ...props}) => {  
  
  const closeModalEsc = (event) => {
    event.key === 'Escape' && onClose();
  }

  useEffect(() => {
    document.addEventListener('keydown', closeModalEsc);
    return () => {
      document.removeEventListener('keydown', closeModalEsc);
    }
  }, [])

  return createPortal((
    <div className={modalStyles.window}>
      <ModalOverlay onClose = {onClose}/>
      <div className={modalStyles.container}>
        <button className={modalStyles.button} onClick = {onClose}>
          <CloseIcon/>
        </button>
        {props.children}
      </div>
    </div>    
  ), modalRoot)
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  props: PropTypes.element.isRequired
}

export default Modal