
import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import Button from '../Button/Button';
import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </Button>
  );
};

export default ThemeToggle;
