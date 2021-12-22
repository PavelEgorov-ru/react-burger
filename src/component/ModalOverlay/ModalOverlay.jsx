import PropTypes from 'prop-types';
import modalOverlayStyles from './ModalOverlay.module.css'

const ModalOverlay = ({onClose}) => {
  return (
    <div className={modalOverlayStyles.container} onClick={onClose}></div>
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default ModalOverlay