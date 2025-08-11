
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiCalendar, FiClock, FiType, FiFileText } from 'react-icons/fi';
import Button from '../../common/Button/Button';
import { useCalendar } from '../../../contexts/CalendarContext';
import { formatInputDate, formatInputTime } from '../../../utils/dateUtils';
import styles from './EventModal.module.scss';

const EventModal = ({ onClose, event = null }) => {
  const { addEvent, updateEvent } = useCalendar();
  const [formData, setFormData] = useState({
    title: event?.title || '',
    date: event?.date || formatInputDate(new Date()),
    time: event?.time || formatInputTime(new Date()),
    description: event?.description || '',
    color: event?.color || '#3b82f6'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (event) {
      updateEvent(event.id, formData);
    } else {
      addEvent(formData);
    }
    onClose();
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>{event ? 'Edit Event' : 'Create Event'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>
              <FiType />
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Event title"
              required
            />
          </div>

          <div className={styles.field}>
            <label>
              <FiCalendar />
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>
              <FiClock />
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>
              <FiFileText />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Event description (optional)"
              rows="3"
            />
          </div>

          <div className={styles.field}>
            <label>Color</label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </div>

          <div className={styles.actions}>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {event ? 'Update' : 'Create'} Event
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EventModal;
