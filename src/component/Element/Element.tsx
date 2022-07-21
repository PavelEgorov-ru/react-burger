import styles from './Element.module.css';
import { useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../hoocks';
import type { IElement, TProps } from './type';
import { elementsActions } from '../../services/reducers/index';

const Element: React.FC<TProps> = ({ element, moveCard, index }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);
  const handleClose = (elementUid: string) => {
    dispatch(elementsActions.deleteElement(elementUid));
  };

  const [, drag] = useDrag({
    type: 'element',
    item: { element, index },
  });

  const [, drop] = useDrop({
    accept: 'element',
    hover(item: { index: number }) {
      if (item.index === index) {
        return;
      }
      if (!ref.current) {
        return;
      }
      moveCard(item.index, index);
      item.index = index;
    },
  });

  drag(drop(ref));
  //index={index} в <li>
  return (
    <li className={cn(styles.li)} draggable ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image}
        handleClose={() => handleClose(element.uid)}
      />
    </li>
  );
};

export default Element;
