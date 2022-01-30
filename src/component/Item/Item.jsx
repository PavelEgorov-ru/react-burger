import styles from './Item.module.css';
import { useDrag } from "react-dnd";
import {Counter, CurrencyIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import typeIndegrient from '../../utils/types';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {openModalIngredient} from '../../services/actions/index'


const Item = ({item,}) => {
  const {bun, elements} = useSelector(store => ({
    bun: store.elements.bun,
    elements: store.elements.elements
  }))

  const dispatch = useDispatch()

  let count = 0
  if(item._id === bun._id) {
    count += 1
  } else {
    elements.forEach((element) => {
      if(element._id === item._id) return count = count + 1;
      return count;
    });
  }

  const [{isDrag},dragRef] = useDrag({
    type: item.type,
    item: item,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const openModal = (item) => {
    dispatch(openModalIngredient(item))
  }

  const boxShadow = isDrag ? '0 0 20px #6434db' : null

  return(
    <li className = {styles.item} onClick={() => openModal(item)} draggable ref={dragRef} style={{boxShadow}}>
     {count !== 0 && <Counter count={count} size="default"/>}
        <img className={`${styles.image} mb-2`} src={item.image} alt="картинка индигрента" />
        <div className={`${styles.price} mb-2`}>
          <p className='text text_type_digits-default mr-2'>{item.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`${styles.description} + text text_type_main-default mb-10`}>{item.name}</p>
    </li>
  )
}

Item.propTypes = {
  item: PropTypes.shape(typeIndegrient).isRequired,
}

export default Item