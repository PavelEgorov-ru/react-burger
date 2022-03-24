import styles from './AppHeader.module.css';
import Menu from '../Menu/Menu';
import cn from 'classnames';

const AppHeader = () => {
  return (
    <header className={cn(styles.header)}>
      <Menu />
    </header>
  );
};

export default AppHeader;
