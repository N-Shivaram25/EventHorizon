
import React, { useState } from 'react';
import { CalendarProvider } from './contexts/CalendarContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header/Header';
import Calendar from './components/calendar/index';
import ViewToggle from './components/calendar/ViewToggle';
import EventModal from './components/calendar/EventModal/EventModal';
import FAB from './components/common/FloatingActionButton/FAB';
import ThemeToggle from './components/common/ThemeToggle/ThemeToggle';
import './assets/styles/global.scss';
import styles from './App.module.scss';

function App() {
  const [showEventModal, setShowEventModal] = useState(false);

  return (
    <ThemeProvider>
      <CalendarProvider>
        <div className={styles.app}>
          <Header />
          
          <div className={styles.content}>
            <div className={styles.controls}>
              <ViewToggle />
              <ThemeToggle />
            </div>
            
            <main className={styles.main}>
              <Calendar />
            </main>
          </div>

          <FAB onClick={() => setShowEventModal(true)} />

          {showEventModal && (
            <EventModal onClose={() => setShowEventModal(false)} />
          )}
        </div>
      </CalendarProvider>
    </ThemeProvider>
  );
}

export default App;
