
import CalendarGrid from './CalendarGrid/CalendarGrid';
import CalendarList from './CalendarList/CalendarList';
import { useCalendar } from '../../contexts/CalendarContext';

const Calendar = () => {
  const { viewMode } = useCalendar();

  return viewMode === 'grid' ? <CalendarGrid /> : <CalendarList />;
};

export default Calendar;
