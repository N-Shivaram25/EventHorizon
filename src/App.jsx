
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { CalendarProvider } from './contexts/CalendarContext';
import Header from './components/layout/Header/Header';
import Calendar from './components/calendar';
import EventModal from './components/calendar/EventModal/EventModal';
import FAB from './components/common/FloatingActionButton/FAB';
import './assets/styles/global.scss';
import styles from './App.module.scss';

function App() {
  const [showEventModal, setShowEventModal] = useState(false);

  const handleOpenEventModal = () => {
    setShowEventModal(true);
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
  };

  return (
    <ThemeProvider>
      <CalendarProvider>
        <div className={styles.app}>
          <Header />
          
          <main className={styles.main}>
            <Calendar />
          </main>

          <FAB onClick={handleOpenEventModal} />

          <AnimatePresence>
            {showEventModal && (
              <EventModal onClose={handleCloseEventModal} />
            )}
          </AnimatePresence>
        </div>
      </CalendarProvider>
    </ThemeProvider>
  );
}

export default App;
