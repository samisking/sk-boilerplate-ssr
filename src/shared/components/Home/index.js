import React from 'react';
import styles from './styles.css';

const Home = () => (
  <div>
    <h2>Welcome</h2>
    <p className={styles.quote}>
      {'A React + React Router v4 + Redux app with server side rendering, code splitting and HMR.'}
    </p>
  </div>
);

export default Home;
