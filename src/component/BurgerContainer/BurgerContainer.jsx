import styles from './BurgerContainer.module.css'

const BurgerContainer = () => {
  return(
    <div className={styles.container}>
      <div className={styles.bun_top}>
        <p className='text text_type_main-default'>Перетащите сюда булочку, а затем ингредиенты</p>
      </div>
      <div className={styles.bun_bottom}></div>
    </div>
  )
}

export default BurgerContainer