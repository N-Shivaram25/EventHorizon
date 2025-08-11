
import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import styles from './FAB.module.scss';

const FAB = ({ onClick, icon = <FiPlus size={24} />, label = "Add Event" }) => {
  return (
    <motion.button
      className={styles.fab}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.3
      }}
      aria-label={label}
    >
      {icon}
    </motion.button>
  );
};

export default FAB;
