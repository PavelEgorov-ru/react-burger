import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './ModalOverlay.module.css';

const ModalOverlay = ({ onClose }) => {
  return <div className={cn(styles.container)} onClick={onClose}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
