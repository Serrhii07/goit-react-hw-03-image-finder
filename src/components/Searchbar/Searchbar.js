import React from 'react';
import styles from './Searchbar.module.css';

const Searchbar = ({ children }) => (
  <header className={styles.searchbar}>{children}</header>
);

export default Searchbar;
