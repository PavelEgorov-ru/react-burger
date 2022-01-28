import React, {useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styles from './BurgerIngredients.module.css';
import TabContainer from '../TabContainer/TabContainer';
import ItemsContainer from '../ItemsContainer/ItemsContainer';


const BurgerIngredients = ({onOpen}) => {

  const {ingredients} = useSelector(store => store.ingredients)

  const [current, setCurrent] = React.useState('булки')
  const handleCurrent = (value) => {
    setCurrent(value)
    if (value === 'булки') {
      bunsSectoin.current.scrollIntoView({behavior:"smooth"})
    } else if (value === 'соусы') {
      saucesSection.current.scrollIntoView({behavior:"smooth"})
    } else {
      mainsSection.current.scrollIntoView({behavior:"smooth"})
    }
  }
  
  const bunsSectoin = useRef(null)
  const saucesSection = useRef(null)
  const mainsSection = useRef(null)

  const onScroll = (event) => {
    const container = event.target
    const scrollPosition = container.scrollTop
    const saucesPosition = saucesSection.current.offsetTop
    const mainsPosition = mainsSection.current.offsetTop

    if(scrollPosition + 200 >= mainsPosition) {
      setCurrent('мясо')
    } else if (scrollPosition + 200 >= saucesPosition) {
      setCurrent('соусы')
    } else {
      setCurrent('булки')
    }
  }

  const buns = React.useMemo(() => {
   return ingredients.filter(element => element.type === 'bun' )
      }, [ingredients]
  )
  
  const sauces = React.useMemo(() => {
   return ingredients.filter(element => element.type === 'sauce' )
  }, [ingredients]
  ) 

  const mains =  React.useMemo(() => {
   return ingredients.filter(element => element.type === 'main' )
  }, [ingredients]
  )
  
  return (
     <section className={styles.sectionSize} >
      <h1 className="text text_type_main-large mt-10 mb-5">
        Соберите бургер
      </h1>
      <TabContainer current = {current} handleCurrent = {handleCurrent} />
      <div className={styles.container} onScroll={onScroll}>
        <ItemsContainer key={1} data = {buns} onOpen={onOpen} ref={bunsSectoin} > Булки </ItemsContainer>
        <ItemsContainer key={2} data = {sauces} onOpen={onOpen} ref={saucesSection} > Соусы </ItemsContainer>
        <ItemsContainer key={3} data = {mains} onOpen={onOpen} ref={mainsSection} > Мясо </ItemsContainer> 
      </div>           
    </section>
  )
}

BurgerIngredients.propTypes = { 
  onOpen: PropTypes.func.isRequired,
}

export default BurgerIngredients