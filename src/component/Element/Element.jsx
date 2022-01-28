import styles from './Element.module.css';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import typeIndegrient from '../../utils/types';

const Element = ({element}) => {

  return (
    <li key={element._id} className={styles.li}>
      <DragIcon/>
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image} />
    </li>
  )
}

Element.propTypes = {
  element: PropTypes.shape(typeIndegrient).isRequired, 
}
export default Element

