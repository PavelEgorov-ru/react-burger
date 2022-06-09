import styles from './FeedCard.module.css';
import { useSelector } from 'react-redux';

const FeedCard = ({ ingredients, _id, status, number, createdAt, updatedAt }) => {
  const data = useSelector((store) => store.ingredients);

  const ingredientsOrder = [];
  for (let i = 0; i < ingredients.length; i++) {
    const element = data.ingredients.find((item) => item._id === ingredients[i]);
    ingredientsOrder.push(element);
  }
  console.log(ingredientsOrder);

  let shiftValue = -40;
  let positionIndex = 6;

  let nameOrder = '';
  let count = 0;
  ingredientsOrder.forEach((element) => {
    nameOrder = `${nameOrder} ` + `${element.name}`;
    count = count + element.price;
  });
  console.log(count);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className="text text_type_digits-default">{`#${_id}`}</p>
        <p className="text text_type_digits-default text_color_inactive">{createdAt}</p>
      </div>
      <p className={`${styles.description} text text_type_main-medium`}>{nameOrder}</p>
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
      </div>
    </div>
  );
};

export default FeedCard;
