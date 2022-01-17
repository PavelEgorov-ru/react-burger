import PropTypes from 'prop-types';
import styles from './IngredientDetails.module.css';
import typeIndegrient from '../../utils/types';

const IngredientDetails = ({indegrient}) => {
  return(
    <>      
      <img src = {indegrient.image_large} alt={indegrient.name}></img>
      <p className='text text_type_main-medium mt-4 mb-8'>{indegrient.name}</p>
      <ul className={styles.description}>
        <li className={styles.li}>
          <p className='text text_type_main-default text_color_inactive'>Калории, калл</p>
          <p className='text text_type_digits-default text_color_inactive'>{indegrient.calories}</p>
        </li>
        <li className={styles.li}>
          <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{indegrient.proteins}</p>
        </li>
        <li className={styles.li}>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{indegrient.fat}</p>
        </li>
        <li className={styles.li}>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{indegrient.carbohydrates}</p>
        </li>
      </ul>
    </>
  )
}


IngredientDetails.propTypes = {
  indegrient: PropTypes.shape(typeIndegrient).isRequired, 
}

export default IngredientDetails