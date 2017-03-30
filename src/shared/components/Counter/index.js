import React, { PropTypes } from 'react';
import styles from './styles.css';

const Counter = ({ count = 0, increment = () => {}, decrement = () => {} }) =>
  <div>
    <h2>Counter</h2>
    <p className={styles.quote}>The count is: {count || 'loading…'}</p>
    <button className="increment" onClick={increment}>+ 1</button>
    <button className="decrement" onClick={decrement}>- 1</button>
  </div>;

Counter.propTypes = {
  count: PropTypes.node,
  increment: PropTypes.func,
  decrement: PropTypes.func
};

export default Counter;
