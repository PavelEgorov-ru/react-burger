import styles from './Element.module.css';
import {useRef} from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from "react-dnd";
import {useDispatch} from 'react-redux';
import typeIndegrient from '../../utils/types';
import {deleteElementConstructor} from '../../services/actions/index'

const Element = ({element, moveCard, index}) => {
  const dispatch = useDispatch()
  const ref = useRef()
  const handleClose = (elementUid) => {
    dispatch(deleteElementConstructor(elementUid))
  }

  const [,drag] = useDrag({
    type: 'element',
    item: {element, index},
  });

  const [, drop] = useDrop({
    accept: 'element',
    hover(item) {
      if(item.index === index) {
        return
      }
      if(!ref.current) {
        return
      }
      moveCard(item.index, index)
      item.index = index
    }
  })
  drag(drop(ref))

  return (
    <li className={styles.li} draggable ref={ref} index={index}>
      <DragIcon/>
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image}
        handleClose={() => handleClose(element.uid)} />
    </li>
  )
}

Element.propTypes = {
  element: PropTypes.shape(typeIndegrient).isRequired,
  index: PropTypes.number.isRequired, 
  moveCard: PropTypes.func.isRequired
}
export default Element

