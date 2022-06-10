import styles from './FeedCard.module.css';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

const FeedCard = ({ ingredients, _id, createdAt, status, isOrderPage }) => {
  const data = useSelector((store) => store.ingredients);
  console.log(status);

  const ingredientsOrder = [];
  for (let i = 0; i < ingredients.length; i++) {
    const element = data.ingredients.find((item) => item._id === ingredients[i]);
    ingredientsOrder.push(element);
  }

  let shiftValue = -40;
  let positionIndex = 6;

  let nameOrder = '';
  let price = 0;
  ingredientsOrder.forEach((element) => {
    nameOrder = `${nameOrder} ` + `${element.name}`;
    price = price + element.price;
  });

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className="text text_type_digits-default">{`#${_id}`}</p>
        <p className="text text_type_digits-default text_color_inactive">{createdAt}</p>
      </div>
      <div className={styles.nameContainer}>
        <p className={`${styles.description} text text_type_main-medium`}>{nameOrder}</p>
        {isOrderPage ? (
          <p
            className={cn(`text text_type_main-default mt-2`, {
              [styles.color]: status === 'done',
            })}
          >
            {status === 'done' ? 'Выполнено' : status === 'created' ? 'Создан' : 'Готовится'}
          </p>
        ) : null}
      </div>
      <div className={styles.footer}>
        <div className={styles.imageContainer}>
          {ingredientsOrder.map((element, index) => {
            if (index < 6) {
              shiftValue = shiftValue + 40;
              positionIndex = positionIndex - 1;
              return (
                <div
                  className={styles.icon}
                  style={{
                    backgroundImage: `url(${element.image})`,
                    position: 'absolute',
                    left: `${shiftValue}px`,
                    zIndex: `${positionIndex}`,
                  }}
                ></div>
              );
            } else return;
          })}
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
