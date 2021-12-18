import modalOverlayStyles from './ModalOverlay.module.css'

const ModalOverlay = ({onClose}) => {
  return (
    <div className={modalOverlayStyles.container} onClick={onClose}></div>
  )
}

export default ModalOverlay