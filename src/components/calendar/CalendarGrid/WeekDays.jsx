
import React from 'react';
import styles from './CalendarGrid.module.scss';

const WeekDays = () => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={styles.weekDays}>
      {weekDays.map(day => (
        <div key={day} className={styles.weekDay}>
          {day}
        </div>
      ))}
    </div>
  );
};

export default WeekDays;
