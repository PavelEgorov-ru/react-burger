import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {closeModalIngredient} from '../../services/actions/index';
import { useDispatch } from 'react-redux';

const modalRoot = document.getElementById("modal-root")


const Modal = ({children, title}) => {  
  const dispatch = useDispatch()

  const closeModalEsc = (event) => {
    event.key === 'Escape' && onClose();
    document.removeEventListener('keydown', closeModalEsc);
  }
  document.addEventListener('keydown', closeModalEsc);

  const onClose = () => {
    dispatch(closeModalIngredient())    
  } 

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