import {FC, ReactNode} from 'react';
import styles from './AppHeader.module.css';

import Menu from '../Menu/Menu';



const AppHeader: FC<Readonly<{ children?: ReactNode }>> = () => {  
  return (
    <header className={styles.header}>
      <Menu/>      
    </header>
  )
}

export default AppHeader 
