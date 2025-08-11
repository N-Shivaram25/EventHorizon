
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import styles from './FAB.module.scss';

const FAB = ({ onClick, icon = <FiPlus size={24} />, label = "Add Event" }) => {
  return (
    <button
      className={styles.fab}
      onClick={onClick}
      aria-label={label}
    >
      {icon}
    </button>
  );
};

export default FAB;
