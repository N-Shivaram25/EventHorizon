
import React from 'react';
import { FiCalendar, FiList } from 'react-icons/fi';
import { useCalendar } from '../../contexts/CalendarContext';
import Button from '../common/Button/Button';
import styles from './ViewToggle.module.scss';

const ViewToggle = () => {
  const { viewMode, setViewMode } = useCalendar();

  const toggleView = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={toggleView}
      className={styles.viewToggle}
      aria-label={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
    >
      {viewMode === 'grid' ? <FiList /> : <FiCalendar />}
      <span>{viewMode === 'grid' ? 'List' : 'Grid'}</span>
    </Button>
  );
};

export default ViewToggle;
