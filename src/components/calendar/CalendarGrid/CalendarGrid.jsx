import React from 'react';
import { useCalendar } from '../../../contexts/CalendarContext';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameDay,
  format
} from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarCell from './CalendarCell';
import WeekDays from './WeekDays';
import styles from './CalendarGrid.module.scss';

const CalendarGrid = () => {
  const { currentDate } = useCalendar();
  const calendarDays = getCalendarDays(currentDate);

  return (
    <div className={styles.calendar}>
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
    </div>
  );
};

export default CalendarGrid;