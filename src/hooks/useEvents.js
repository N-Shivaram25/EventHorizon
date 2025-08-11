
import { useState, useCallback, useMemo } from 'react';
import { useCalendar } from '../contexts/CalendarContext';
import { 
  getEventsForDate, 
  getEventsForRange, 
  sortEventsByDate,
  generateRecurringEvents,
  parseDate
} from '../utils/dateUtils';
import { v4 as uuidv4 } from 'uuid';

/**
 * Custom hook for event management
 */
export const useEvents = () => {
  const {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    setError,
    currentDate,
    monthStart,
    monthEnd
  } = useCalendar();

  const [editingEvent, setEditingEvent] = useState(null);

  /**
   * Creates a new event
   * @param {Object} eventData - Event data
   * @returns {Promise<boolean>} Success status
   */
  const createEvent = useCallback(async (eventData) => {
    try {
      const newEvent = {
        id: uuidv4(),
        title: eventData.title || 'Untitled Event',
        description: eventData.description || '',
        dateTime: eventData.dateTime,
        endDateTime: eventData.endDateTime || eventData.dateTime,
        color: eventData.color || '#3b82f6',
        category: eventData.category || 'general',
        recurring: eventData.recurring || null,
        reminders: eventData.reminders || [],
        location: eventData.location || '',
        attendees: eventData.attendees || [],
        isAllDay: eventData.isAllDay || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Validate required fields
      if (!newEvent.title.trim()) {
        throw new Error('Event title is required');
      }

      if (!newEvent.dateTime) {
        throw new Error('Event date and time is required');
      }

      // Validate date
      const eventDate = parseDate(newEvent.dateTime);
      if (!eventDate) {
        throw new Error('Invalid event date');
      }

      addEvent(newEvent);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  }, [addEvent, setError]);

  /**
   * Updates an existing event
   * @param {string} eventId - Event ID
   * @param {Object} updates - Event updates
   * @returns {Promise<boolean>} Success status
   */
  const editEvent = useCallback(async (eventId, updates) => {
    try {
      const existingEvent = events.find(e => e.id === eventId);
      if (!existingEvent) {
        throw new Error('Event not found');
      }

      const updatedEvent = {
        ...existingEvent,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      // Validate required fields
      if (!updatedEvent.title.trim()) {
        throw new Error('Event title is required');
      }

      if (!updatedEvent.dateTime) {
        throw new Error('Event date and time is required');
      }

      // Validate date
      const eventDate = parseDate(updatedEvent.dateTime);
      if (!eventDate) {
        throw new Error('Invalid event date');
      }

      updateEvent(updatedEvent);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  }, [events, updateEvent, setError]);

  /**
   * Deletes an event
   * @param {string} eventId - Event ID
   * @returns {Promise<boolean>} Success status
   */
  const removeEvent = useCallback(async (eventId) => {
    try {
      const event = events.find(e => e.id === eventId);
      if (!event) {
        throw new Error('Event not found');
      }

      deleteEvent(eventId);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  }, [events, deleteEvent, setError]);

  /**
   * Duplicates an event
   * @param {string} eventId - Event ID
   * @param {Object} newDateTime - New date and time
   * @returns {Promise<boolean>} Success status
   */
  const duplicateEvent = useCallback(async (eventId, newDateTime) => {
    try {
      const event = events.find(e => e.id === eventId);
      if (!event) {
        throw new Error('Event not found');
      }

      const duplicatedEvent = {
        ...event,
        id: uuidv4(),
        dateTime: newDateTime.dateTime || event.dateTime,
        endDateTime: newDateTime.endDateTime || event.endDateTime,
        title: `${event.title} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      return await createEvent(duplicatedEvent);
    } catch (error) {
      setError(error.message);
      return false;
    }
  }, [events, createEvent, setError]);

  // Memoized computed values
  const eventsForCurrentMonth = useMemo(() => {
    return getEventsForRange(events, monthStart, monthEnd);
  }, [events, monthStart, monthEnd]);

  const sortedEvents = useMemo(() => {
    return sortEventsByDate(events);
  }, [events]);

  const eventsByCategory = useMemo(() => {
    return events.reduce((acc, event) => {
      const category = event.category || 'general';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(event);
      return acc;
    }, {});
  }, [events]);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return sortEventsByDate(
      events.filter(event => {
        const eventDate = parseDate(event.dateTime);
        return eventDate && eventDate >= now;
      })
    ).slice(0, 5); // Get next 5 upcoming events
  }, [events]);

  // Event filtering functions
  const getEventsForSpecificDate = useCallback((date) => {
    return getEventsForDate(events, date);
  }, [events]);

  const getEventsForDateRange = useCallback((startDate, endDate) => {
    return getEventsForRange(events, startDate, endDate);
  }, [events]);

  const searchEvents = useCallback((query) => {
    if (!query.trim()) return events;
    
    const searchTerm = query.toLowerCase();
    return events.filter(event => 
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm)
    );
  }, [events]);

  const filterEventsByCategory = useCallback((category) => {
    if (!category) return events;
    return events.filter(event => event.category === category);
  }, [events]);

  // Event validation
  const validateEventData = useCallback((eventData) => {
    const errors = [];

    if (!eventData.title || !eventData.title.trim()) {
      errors.push('Title is required');
    }

    if (!eventData.dateTime) {
      errors.push('Date and time is required');
    } else {
      const eventDate = parseDate(eventData.dateTime);
      if (!eventDate) {
        errors.push('Invalid date and time');
      }
    }

    if (eventData.endDateTime) {
      const startDate = parseDate(eventData.dateTime);
      const endDate = parseDate(eventData.endDateTime);
      
      if (startDate && endDate && endDate < startDate) {
        errors.push('End time must be after start time');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }, []);

  return {
    // State
    events,
    editingEvent,
    setEditingEvent,
    
    // Actions
    createEvent,
    editEvent,
    removeEvent,
    duplicateEvent,
    
    // Computed values
    eventsForCurrentMonth,
    sortedEvents,
    eventsByCategory,
    upcomingEvents,
    
    // Utility functions
    getEventsForSpecificDate,
    getEventsForDateRange,
    searchEvents,
    filterEventsByCategory,
    validateEventData
  };
};
