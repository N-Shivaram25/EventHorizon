
import React from 'react';
import { motion } from 'framer-motion';
import CalendarHeader from './CalendarHeader';
import WeekDays from './WeekDays';
import CalendarCell from './CalendarCell';
import { useCalendar } from '../../../contexts/CalendarContext';
import { getCalendarDays } from '../../../utils/dateUtils';
import styles from './CalendarGrid.module.scss';

const CalendarGrid = () => {
  const { currentDate } = useCalendar();
  const calendarDays = getCalendarDays(currentDate);

  return (
    <motion.div 
      className={styles.calendar}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CalendarHeader />
      <WeekDays />
      
      <div className={styles.grid}>
        {calendarDays.map((date, index) => (
          <CalendarCell
            key={`${date.toISOString()}-${index}`}
            date={date}
            isCurrentMonth={date.getMonth() === currentDate.getMonth()}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default CalendarGrid;
