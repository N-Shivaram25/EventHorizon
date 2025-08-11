import { useState, useEffect } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  isSameMonth, 
  isSameDay,
  parseISO
} from 'date-fns';
import { motion } from 'framer-motion';

const Calendar = ({ viewMode }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  // Load events from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button 
          onClick={() => setCurrentDate(addDays(currentDate, -1))}
          className="nav-button"
        >
          &lt;
        </button>
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <button 
          onClick={() => setCurrentDate(addDays(currentDate, 1))}
          className="nav-button"
        >
          &gt;
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEE';
    let startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="day-name" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days-row">{days}</div>;
  };

  const renderCells = () => {
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const dayEvents = events.filter(event => 
          isSameDay(parseISO(event.dateTime), cloneDay)
        );

        days.push(
          <motion.div
            className={`day-cell ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : isSameDay(day, selectedDate)
                ? 'selected'
                : ''
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
            whileHover={{ scale: 1.03 }}
          >
            <span className="day-number">{formattedDate}</span>
            {dayEvents.length > 0 && (
              <div className="events-preview">
                {dayEvents.slice(0, 2).map(event => (
                  <div 
                    key={event.id} 
                    className="event-preview"
                    style={{ backgroundColor: event.color || '#3b82f6' }}
                  >
                    {event.time && <span>{event.time}</span>}
                    <p>{event.title}</p>
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="more-events">+{dayEvents.length - 2} more</div>
                )}
              </div>
            )}
          </motion.div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="week-row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar-body">{rows}</div>;
  };

  const onDateClick = day => {
    setSelectedDate(day);
  };

  if (viewMode === 'list') {
    return (
      <div className="list-view">
        <h2>Upcoming Events</h2>
        {events.length > 0 ? (
          events.map(event => (
            <div key={event.id} className="list-event">
              <div className="event-date">
                {format(parseISO(event.dateTime), 'MMM dd')}
              </div>
              <div className="event-details">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-events">No events scheduled</p>
        )}
      </div>
    );
  }

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;