import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './TabContainer.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const TabContainer = ({ current, handleCurrent }) => {
  const scrollTab = (value) => {
    handleCurrent(value);
  };

  return (
    <div className={cn(styles.container)}>
      <Tab value="булки" active={current === 'булки'} onClick={scrollTab}>
        Булки
      </Tab>
      <Tab value="соусы" active={current === 'соусы'} onClick={scrollTab}>
        Соусы
      </Tab>
      <Tab value="мясо" active={current === 'мясо'} onClick={scrollTab}>
        Мясо
      </Tab>
    </div>
  );
};

TabContainer.propTypes = {
  current: PropTypes.string.isRequired,
  handleCurrent: PropTypes.func.isRequired,
};

export default TabContainer;
