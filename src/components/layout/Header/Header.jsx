
import React from 'react';
import { FiSun, FiMoon, FiCalendar, FiList } from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import { useCalendar } from '../../../contexts/CalendarContext';
import Button from '../../common/Button/Button';
import styles from './Header.module.scss';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { viewMode, setViewMode } = useCalendar();

  const handleViewToggle = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <FiCalendar className={styles.brandIcon} />
          <h1 className={styles.title}>Event Calendar</h1>
        </div>
        
        <div className={styles.controls}>
          <Button
            variant="ghost"
            onClick={handleViewToggle}
            icon={viewMode === 'grid' ? <FiList size={20} /> : <FiCalendar size={20} />}
            aria-label={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
          >
            {viewMode === 'grid' ? 'List View' : 'Calendar View'}
          </Button>
          
          <Button
            variant="ghost"
            onClick={toggleTheme}
            icon={theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
