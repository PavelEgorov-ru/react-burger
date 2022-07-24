import React, { ReactNode, useMemo, useRef } from 'react';
import { useAppSelector } from '../../hoocks';
import cn from 'classnames';
import styles from './BurgerIngredients.module.css';
import TabContainer from '../TabContainer/TabContainer';
import ItemsContainer from '../ItemsContainer/ItemsContainer';

const BurgerIngredients = () => {
  const { ingredients } = useAppSelector((store) => store.ingredients);

  const [current, setCurrent] = React.useState('булки');
  const handleCurrent = (value: string) => {
    setCurrent(value);
    if (value === 'булки') {
      bunsSectoin.current && bunsSectoin.current.scrollIntoView({ behavior: 'smooth' });
    } else if (value === 'соусы') {
      saucesSection.current && saucesSection.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      mainsSection.current && mainsSection.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bunsSectoin = useRef<HTMLDivElement>(null);
  const saucesSection = useRef<HTMLDivElement>(null);
  const mainsSection = useRef<HTMLDivElement>(null);

  const onScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    //  Пытаюсь использовать UIEvent<HTMLDivElement>, но почему-то не могу. Оно не универсальное у меня получается
    event.stopPropagation();
    const container = event.target;
    // @ts-ignore
    const scrollPosition: number = container ? container.scrollTop : null;
    const saucesPosition: number = saucesSection.current ? saucesSection.current.offsetTop : 0;
    const mainsPosition: number = mainsSection.current ? mainsSection.current.offsetTop : 0;

    if (scrollPosition + 200 >= mainsPosition) {
      setCurrent('мясо');
    } else if (scrollPosition + 200 >= saucesPosition) {
      setCurrent('соусы');
    } else {
      setCurrent('булки');
    }
  };

  const buns = useMemo(() => {
    return ingredients.filter((element) => element.type === 'bun');
  }, [ingredients]);

  const sauces = useMemo(() => {
    return ingredients.filter((element) => element.type === 'sauce');
  }, [ingredients]);

  const mains = useMemo(() => {
    return ingredients.filter((element) => element.type === 'main');
  }, [ingredients]);

  return (
    <section className={cn(styles.sectionSize)}>
      <h1 className={cn('text text_type_main-large mt-10 mb-5')}>Соберите бургер</h1>
      <TabContainer current={current} handleCurrent={handleCurrent} />
      <div className={cn(styles.container)} onScroll={onScroll}>
        <ItemsContainer key={1} data={buns} ref={bunsSectoin}>
          Булки
        </ItemsContainer>
        <ItemsContainer key={2} data={sauces} ref={saucesSection}>
          Соусы
        </ItemsContainer>
        <ItemsContainer key={3} data={mains} ref={mainsSection}>
          Мясо
        </ItemsContainer>
      </div>
    </section>
  );
};

export default BurgerIngredients;
