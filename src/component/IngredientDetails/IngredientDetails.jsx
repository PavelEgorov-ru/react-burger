
import ingredientDetailsStyles from './IngredientDetails.module.css';

const IngredientDetails = ({indegrient}) => {
  return(
    <>
      <h2 className={`${ingredientDetailsStyles.title} text text_type_main-large`}>Детали ингредиента</h2>
      <img src = {indegrient.image_large} alt={indegrient.name}></img>
      <p className='text text_type_main-medium mt-4 mb-8'>{indegrient.name}</p>
      <ul className={ingredientDetailsStyles.description}>
        <li className={ingredientDetailsStyles.li}>
          <p className='text text_type_main-default text_color_inactive'>Калории, калл</p>
          <p className='text text_type_digits-default text_color_inactive'>{indegrient.calories}</p>
        </li>
        <li className={ingredientDetailsStyles.li}>
          <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{indegrient.proteins}</p>
        </li>
        <li className={ingredientDetailsStyles.li}>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{indegrient.fat}</p>
        </li>
        <li className={ingredientDetailsStyles.li}>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{indegrient.carbohydrates}</p>
        </li>
      </ul>
    </>
    

  )
}

export default IngredientDetails