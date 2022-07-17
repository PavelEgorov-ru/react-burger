import React from 'react';
import cn from 'classnames';
import styles from './ItemsContainer.module.css';
import type { TProps } from './type';
import Item from '../Item/Item';

const ItemsContainer = React.forwardRef<HTMLDivElement, TProps>(({ data, children }, ref) => {
  return (
    <div ref={ref}>
      <h2 className={cn('text text_type_main-medium pt-10')}>{children}</h2>
      <ul className={cn(`pr-4 pl-4 pt-6 pb-10 ${styles.itemContainer}`)}>
        {data.map((item) => {
          return <Item key={item._id} item={item} />;
        })}
      </ul>
    </div>
  );
});

// ItemsContainer.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.shape(typeIndegrient)).isRequired,
//   children: PropTypes.string.isRequired,
// };

export default ItemsContainer;
