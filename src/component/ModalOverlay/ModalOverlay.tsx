import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './ModalOverlay.module.css';
import type { TProps } from './type';

const ModalOverlay: React.FC<TProps> = ({ onClose }) => {
  return <div className={cn(styles.container)} onClick={onClose}></div>;
};

export default ModalOverlay;
