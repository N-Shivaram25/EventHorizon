
import React from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.scss';

/**
 * Reusable Button component
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = null,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  return (
    <motion.button
      className={buttonClasses}
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading && <div className={styles.spinner} />}
      {!loading && icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{children}</span>
    </motion.button>
  );
};

export default Button;
