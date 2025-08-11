
import {
  format,
  parseISO,
  isToday,
  isSameDay,
  isSameMonth,
  isSameWeek,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  isValid,
  parseJSON
} from 'date-fns';

/**
 * Formats a date to a readable string
 * @param {Date|string} date - The date to format
 * @param {string} formatString - The format string
 * @returns {string} Formatted date string
 */
export const formatDate = (date, formatString = 'yyyy-MM-dd') => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return '';
  
  return format(dateObj, formatString);
};

/**
 * Formats a date for display
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDisplayDate = (date) => {
  return formatDate(date, 'MMMM d, yyyy');
};

/**
 * Formats a date for input fields
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatInputDate = (date) => {
  return formatDate(date, 'yyyy-MM-dd');
};

/**
 * Formats time for input fields
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted time string
 */
export const formatInputTime = (date) => {
  return formatDate(date, 'HH:mm');
};

/**
 * Formats a date and time for display
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date) => {
  return formatDate(date, 'MMM d, yyyy h:mm aa');
};

/**
 * Parses a date string safely
 * @param {string} dateString - The date string to parse
 * @returns {Date|null} Parsed date or null if invalid
 */
export const parseDate = (dateString) => {
  if (!dateString) return null;
  
  try {
    const date = parseISO(dateString);
    return isValid(date) ? date : null;
  } catch {
    return null;
  }
};

/**
 * Gets the calendar days for a month view
 * @param {Date} date - The date for the month
 * @returns {Date[]} Array of dates for the calendar grid
 */
export const getCalendarDays = (date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const days = [];
  let currentDate = calendarStart;
  
  while (currentDate <= calendarEnd) {
    days.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  
  return days;
};

/**
 * Checks if a date is in the current month
 * @param {Date} date - The date to check
 * @param {Date} monthDate - The reference month date
 * @returns {boolean} True if in same month
 */
export const isInCurrentMonth = (date, monthDate) => {
  return isSameMonth(date, monthDate);
};

/**
 * Gets events for a specific date
 * @param {Array} events - Array of events
 * @param {Date} date - The target date
 * @returns {Array} Filtered events for the date
 */
export const getEventsForDate = (events, date) => {
  return events.filter(event => {
    const eventDate = parseDate(event.dateTime);
    return eventDate && isSameDay(eventDate, date);
  });
};

/**
 * Gets events for a date range
 * @param {Array} events - Array of events
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Array} Filtered events for the range
 */
export const getEventsForRange = (events, startDate, endDate) => {
  return events.filter(event => {
    const eventDate = parseDate(event.dateTime);
    if (!eventDate) return false;
    
    return eventDate >= startDate && eventDate <= endDate;
  });
};

/**
 * Sorts events by date and time
 * @param {Array} events - Array of events to sort
 * @returns {Array} Sorted events
 */
export const sortEventsByDate = (events) => {
  return [...events].sort((a, b) => {
    const dateA = parseDate(a.dateTime);
    const dateB = parseDate(b.dateTime);
    
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    
    return dateA.getTime() - dateB.getTime();
  });
};

/**
 * Generates recurring event dates
 * @param {Object} event - The base event
 * @param {Date} startDate - Start date for generation
 * @param {Date} endDate - End date for generation
 * @returns {Array} Array of recurring event objects
 */
export const generateRecurringEvents = (event, startDate, endDate) => {
  if (!event.recurring || !event.recurring.type) {
    return [event];
  }
  
  const events = [];
  const baseDate = parseDate(event.dateTime);
  if (!baseDate) return [event];
  
  const { type, interval = 1, endDate: recurEndDate, occurrences } = event.recurring;
  
  let currentDate = new Date(baseDate);
  let count = 0;
  const maxOccurrences = occurrences || 100; // Limit to prevent infinite loops
  const finalEndDate = recurEndDate ? parseDate(recurEndDate) : endDate;
  
  while (currentDate <= finalEndDate && currentDate <= endDate && count < maxOccurrences) {
    if (currentDate >= startDate) {
      events.push({
        ...event,
        id: `${event.id}_${count}`,
        dateTime: currentDate.toISOString(),
        isRecurring: true,
        originalId: event.id
      });
    }
    
    count++;
    
    switch (type) {
      case 'daily':
        currentDate = addDays(currentDate, interval);
        break;
      case 'weekly':
        currentDate = addWeeks(currentDate, interval);
        break;
      case 'monthly':
        currentDate = addMonths(currentDate, interval);
        break;
      case 'yearly':
        currentDate = addYears(currentDate, interval);
        break;
      default:
        return events;
    }
  }
  
  return events;
};

/**
 * Gets relative date text (Today, Tomorrow, etc.)
 * @param {Date|string} date - The date to check
 * @returns {string} Relative date text or formatted date
 */
export const getRelativeDateText = (date) => {
  const dateObj = typeof date === 'string' ? parseDate(date) : date;
  if (!dateObj) return '';
  
  if (isToday(dateObj)) {
    return 'Today';
  }
  
  const daysDiff = differenceInDays(dateObj, new Date());
  
  if (daysDiff === 1) return 'Tomorrow';
  if (daysDiff === -1) return 'Yesterday';
  if (daysDiff > 0 && daysDiff <= 7) return `In ${daysDiff} days`;
  if (daysDiff < 0 && daysDiff >= -7) return `${Math.abs(daysDiff)} days ago`;
  
  return formatDisplayDate(dateObj);
};

/**
 * Validates if a time string is valid
 * @param {string} timeString - Time string in HH:mm format
 * @returns {boolean} True if valid
 */
export const isValidTime = (timeString) => {
  if (!timeString) return false;
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeString);
};

/**
 * Combines date and time strings into a Date object
 * @param {string} dateString - Date string
 * @param {string} timeString - Time string
 * @returns {Date|null} Combined Date object or null
 */
export const combineDateAndTime = (dateString, timeString) => {
  if (!dateString) return null;
  
  const dateTimeString = timeString 
    ? `${dateString}T${timeString}:00`
    : `${dateString}T00:00:00`;
  
  return parseDate(dateTimeString);
};
