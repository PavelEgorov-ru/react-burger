import cn from 'classnames';
import styles from './IngredientDetails.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const IngredientDetails = () => {
  const { ingredients } = useSelector((store) => store.ingredients);
  const router = useParams();
  const id = router.id;
  const ingredient = ingredients.find((el) => el._id === id);

  if (!ingredient) return <div>загрузка</div>;

  return (
    <>
      <img src={ingredient.image_large} alt={ingredient.name}></img>
      <p className={cn('text text_type_main-medium mt-4 mb-8')}>{ingredient.name}</p>
      <ul className={cn(styles.description)}>
        <li className={cn(styles.li)}>
          <p className={cn('text text_type_main-default text_color_inactive')}>Калории, калл</p>
          <p className={cn('text text_type_digits-default text_color_inactive')}>
            {ingredient.calories}
          </p>
        </li>
        <li className={cn(styles.li)}>
          <p className={cn('text text_type_main-default text_color_inactive')}>Белки, г</p>
          <p className={cn('text text_type_digits-default text_color_inactive')}>
            {ingredient.proteins}
          </p>
        </li>
        <li className={cn(styles.li)}>
          <p className={cn('text text_type_main-default text_color_inactive')}>Жиры, г</p>
          <p className={cn('text text_type_digits-default text_color_inactive')}>
            {ingredient.fat}
          </p>
        </li>
        <li className={cn(styles.li)}>
          <p className={cn('text text_type_main-default text_color_inactive')}>Углеводы, г</p>
          <p className={cn('text text_type_digits-default text_color_inactive')}>
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </>
  );
};

export default IngredientDetails;
