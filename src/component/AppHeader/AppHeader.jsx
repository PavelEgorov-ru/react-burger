import styles from './AppHeader.module.css';
import Menu from '../Menu/Menu';



const AppHeader = () => {  
  return (
    <header className={styles.header}>
      <Menu/>      
    </header>
  )
}

export default AppHeader 