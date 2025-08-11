
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';

const CalendarContext = createContext();

// Action types
const CALENDAR_ACTIONS = {
  SET_CURRENT_DATE: 'SET_CURRENT_DATE',
  SET_SELECTED_DATE: 'SET_SELECTED_DATE',
  SET_VIEW_MODE: 'SET_VIEW_MODE',
  NEXT_MONTH: 'NEXT_MONTH',
  PREV_MONTH: 'PREV_MONTH',
  SET_EVENTS: 'SET_EVENTS',
  ADD_EVENT: 'ADD_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

// Initial state
const initialState = {
  currentDate: new Date(),
  selectedDate: null,
  viewMode: 'grid', // 'grid' or 'list'
  events: [],
  loading: false,
  error: null
};

// Reducer
const calendarReducer = (state, action) => {
  switch (action.type) {
    case CALENDAR_ACTIONS.SET_CURRENT_DATE:
      return { ...state, currentDate: action.payload };
    
    case CALENDAR_ACTIONS.SET_SELECTED_DATE:
      return { ...state, selectedDate: action.payload };
    
    case CALENDAR_ACTIONS.SET_VIEW_MODE:
      return { ...state, viewMode: action.payload };
    
    case CALENDAR_ACTIONS.NEXT_MONTH:
      return { ...state, currentDate: addMonths(state.currentDate, 1) };
    
    case CALENDAR_ACTIONS.PREV_MONTH:
      return { ...state, currentDate: subMonths(state.currentDate, 1) };
    
    case CALENDAR_ACTIONS.SET_EVENTS:
      return { ...state, events: action.payload };
    
    case CALENDAR_ACTIONS.ADD_EVENT:
      return { ...state, events: [...state.events, action.payload] };
    
    case CALENDAR_ACTIONS.UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        )
      };
    
    case CALENDAR_ACTIONS.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload)
      };
    
    case CALENDAR_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case CALENDAR_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    
    default:
      return state;
  }
};

export const CalendarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  // Load events from localStorage on mount
  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem('calendar-events');
      if (savedEvents) {
        dispatch({
          type: CALENDAR_ACTIONS.SET_EVENTS,
          payload: JSON.parse(savedEvents)
        });
      }
    } catch (error) {
      console.error('Error loading events from localStorage:', error);
    }
  }, []);

  // Save events to localStorage when events change
  useEffect(() => {
    try {
      localStorage.setItem('calendar-events', JSON.stringify(state.events));
    } catch (error) {
      console.error('Error saving events to localStorage:', error);
    }
  }, [state.events]);

  // Action creators
  const actions = {
    setCurrentDate: (date) => dispatch({ type: CALENDAR_ACTIONS.SET_CURRENT_DATE, payload: date }),
    setSelectedDate: (date) => dispatch({ type: CALENDAR_ACTIONS.SET_SELECTED_DATE, payload: date }),
    setViewMode: (mode) => dispatch({ type: CALENDAR_ACTIONS.SET_VIEW_MODE, payload: mode }),
    nextMonth: () => dispatch({ type: CALENDAR_ACTIONS.NEXT_MONTH }),
    prevMonth: () => dispatch({ type: CALENDAR_ACTIONS.PREV_MONTH }),
    setEvents: (events) => dispatch({ type: CALENDAR_ACTIONS.SET_EVENTS, payload: events }),
    addEvent: (event) => dispatch({ type: CALENDAR_ACTIONS.ADD_EVENT, payload: event }),
    updateEvent: (event) => dispatch({ type: CALENDAR_ACTIONS.UPDATE_EVENT, payload: event }),
    deleteEvent: (eventId) => dispatch({ type: CALENDAR_ACTIONS.DELETE_EVENT, payload: eventId }),
    setLoading: (loading) => dispatch({ type: CALENDAR_ACTIONS.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: CALENDAR_ACTIONS.SET_ERROR, payload: error })
  };

  const value = {
    ...state,
    ...actions,
    monthStart: startOfMonth(state.currentDate),
    monthEnd: endOfMonth(state.currentDate)
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
