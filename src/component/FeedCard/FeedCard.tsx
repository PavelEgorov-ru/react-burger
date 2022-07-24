import styles from './FeedCard.module.css';
import { useAppSelector } from '../../hoocks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { dateUtils } from '../../utils/date-utils';
import cn from 'classnames';
import { nanoid } from '@reduxjs/toolkit';
import type { TProps } from './type';

const FeedCard: React.FC<TProps> = ({ ingredients, createdAt, status, name, number }) => {
  const data = useAppSelector((store) => store.ingredients);
  const location = useLocation();
  const { url } = useRouteMatch();

  const ingredientsOrder = [];
  for (let i = 0; i < ingredients.length; i++) {
    // здесь для  item добавил тип any. Без него условие почему-то ломается. Хотя в обоих типах есть все необходимое. Не понимаю природы ошибки
    const element = data.ingredients.find((item) => item._id === ingredients[i]);
    if (element) {
      ingredientsOrder.push(element);
    }
  }

  let shiftValue = -40;
  let positionIndex = 6;

  let price = 0;
  ingredientsOrder.forEach((element) => {
    price = price + element.price;
  });

  return (
    <Link
      to={{
        pathname: `${location.pathname}/${number}`,
        state: { background: location },
      }}
      className={styles.link}
    >
      <div className={styles.card}>
        <div className={styles.header}>
          <p className="text text_type_digits-default">{`#${number}`}</p>
          <p className="text text_type_main-default text_color_inactive">{dateUtils(createdAt)}</p>
        </div>
        <div className={styles.nameContainer}>
          <p className={`${styles.description} text text_type_main-medium`}>{name}</p>

          <p
            className={cn(`text text_type_main-default mt-2`, {
              [styles.color]: status === 'done',
            })}
          >
            {status === 'done' ? 'Выполнено' : status === 'created' ? 'Создан' : 'Готовится'}
          </p>
        </div>
        <div className={styles.footer}>
          <div className={styles.imageContainer}>
            {ingredientsOrder.map((element, index) => {
              if (index < 6) {
                shiftValue = shiftValue + 40;
                positionIndex = positionIndex - 1;

                if (index === 5) {
                  return (
                    <div
                      className={`${styles.icon} ${styles.icon_last}`}
                      style={{
                        backgroundImage: `url(${element.image})`,
                        position: 'absolute',
                        left: `${shiftValue}px`,
                        zIndex: `${positionIndex}`,
                      }}
                      key={nanoid()}
                    >
                      {ingredientsOrder.length - 6 !== 0 && (
                        <p className={`text text_type_digits-default ${styles.number}`}>
                          +{ingredientsOrder.length - 6}
                        </p>
                      )}
                    </div>
                  );
                }

                return (
                  <div
                    className={styles.icon}
                    style={{
                      backgroundImage: `url(${element.image})`,
                      position: 'absolute',
                      left: `${shiftValue}px`,
                      zIndex: `${positionIndex}`,
                    }}
                    key={nanoid()}
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
    </Link>
  );
};

export default FeedCard;
