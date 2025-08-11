
import React from 'react';
import { motion } from 'framer-motion';
import { useCalendar } from '../../../contexts/CalendarContext';
import { formatDisplayDate, isToday, isSameDay } from '../../../utils/dateUtils';
import styles from './CalendarList.module.scss';

const CalendarList = () => {
  const { events, currentDate } = useCalendar();

  // Group events by date
  const groupedEvents = events.reduce((acc, event) => {
    const eventDate = new Date(event.date);
    const dateKey = eventDate.toISOString().split('T')[0];
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(groupedEvents).sort();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Events List</h2>
        <p>Showing all upcoming events</p>
      </div>

      <div className={styles.eventsList}>
        {sortedDates.length === 0 ? (
          <div className={styles.noEvents}>
            <p>No events scheduled</p>
          </div>
        ) : (
          sortedDates.map((date, index) => (
            <motion.div
              key={date}
              className={styles.dateGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.dateHeader}>
                <h3>
                  {formatDisplayDate(new Date(date))}
                  {isToday(new Date(date)) && <span className={styles.todayBadge}>Today</span>}
                </h3>
              </div>
              
              <div className={styles.events}>
                {groupedEvents[date].map((event) => (
                  <div
                    key={event.id}
                    className={styles.event}
                    style={{ borderLeftColor: event.color }}
                  >
                    <div className={styles.eventTime}>
                      {event.time}
                    </div>
                    <div className={styles.eventContent}>
                      <h4>{event.title}</h4>
                      {event.description && (
                        <p>{event.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarList;
