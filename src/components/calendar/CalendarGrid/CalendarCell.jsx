
import React from 'react';
import { isToday, isSameMonth } from '../../../utils/dateUtils';
import styles from './CalendarGrid.module.scss';

const CalendarCell = ({ date, currentMonth, events = [], onDateClick }) => {
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const todayCell = isToday(date);

  return (
    <div
      className={`${styles.cell} ${!isCurrentMonth ? styles.otherMonth : ''} ${todayCell ? styles.today : ''}`}
      onClick={() => onDateClick(date)}
    >
      <span className={styles.date}>{date.getDate()}</span>
      {events.length > 0 && (
        <div className={styles.events}>
          {events.slice(0, 3).map((event, index) => (
            <div
              key={event.id || index}
              className={styles.event}
              style={{ backgroundColor: event.color }}
              title={event.title}
            >
              {event.title}
            </div>
          ))}
          {events.length > 3 && (
            <div className={styles.moreEvents}>+{events.length - 3} more</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarCell;
