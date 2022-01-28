import PropTypes from 'prop-types';
import styles from './IngredientDetails.module.css';
import typeIndegrient from '../../utils/types';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
  const {ingredient} = useSelector((store) => ({
    ingredient: store.ingredient.ingredient
  }))

 

  return(
    <>      
      <img src = {ingredient.image_large} alt={ingredient.name}></img>
      <p className='text text_type_main-medium mt-4 mb-8'>{ingredient.name}</p>
      <ul className={styles.description}>
        <li className={styles.li}>
          <p className='text text_type_main-default text_color_inactive'>Калории, калл</p>
          <p className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</p>
        </li>
        <li className={styles.li}>
          <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</p>
        </li>
        <li className={styles.li}>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</p>
        </li>
        <li className={styles.li}>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </>
  )
}


export default IngredientDetails