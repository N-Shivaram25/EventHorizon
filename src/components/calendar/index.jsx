
import React from 'react';
import { useCalendar } from '../../contexts/CalendarContext';
import CalendarGrid from './CalendarGrid/CalendarGrid';
import CalendarList from './CalendarList/CalendarList';

const Calendar = () => {
  const { viewMode } = useCalendar();
  
  return viewMode === 'grid' ? <CalendarGrid /> : <CalendarList />;
};

export default Calendar;
