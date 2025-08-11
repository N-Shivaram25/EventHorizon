import { useState } from 'react';
import { FiPlus, FiSun, FiMoon, FiCalendar, FiList } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showEventModal, setShowEventModal] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <header className="app-header">
        <h1>Event Calendar</h1>
        <div className="controls">
          <button 
            className="view-toggle"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <FiList size={20} /> : <FiCalendar size={20} />}
            <span>{viewMode === 'grid' ? 'List View' : 'Calendar View'}</span>
          </button>
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
      </header>

      <main className="app-main">
        <Calendar viewMode={viewMode} />
      </main>

      <motion.button 
        className="fab"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowEventModal(true)}
      >
        <FiPlus size={24} />
      </motion.button>

      <AnimatePresence>
        {showEventModal && (
          <EventModal onClose={() => setShowEventModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Simplified EventModal component for demonstration
const EventModal = ({ onClose }) => {
  return (
    <motion.div 
      className="event-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="modal-content">
        <h3>Add New Event</h3>
        <form>
          <div className="form-group">
            <label>Event Title</label>
            <input type="text" placeholder="Meeting with team" />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input type="time" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows="3" placeholder="Event details..."></textarea>
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="confirm-btn">
              Save Event
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default App;