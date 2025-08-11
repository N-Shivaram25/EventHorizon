
import React from 'react';
import { format } from 'date-fns';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useCalendar } from '../../../contexts/CalendarContext';
import Button from '../../common/Button/Button';
import styles from './CalendarHeader.module.scss';

const CalendarHeader = () => {
  const { currentDate, nextMonth, prevMonth } = useCalendar();

  return (
    <div className={styles.header}>
      <Button
        variant="ghost"
        size="small"
        onClick={prevMonth}
        icon={<FiChevronLeft size={18} />}
        aria-label="Previous month"
      />
      
      <h2 className={styles.title}>
        {format(currentDate, 'MMMM yyyy')}
      </h2>
      
      <Button
        variant="ghost"
        size="small"
        onClick={nextMonth}
        icon={<FiChevronRight size={18} />}
        aria-label="Next month"
      />
    </div>
  );
};

export default CalendarHeader;
