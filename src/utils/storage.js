
/**
 * Storage utilities for managing localStorage operations
 */

const STORAGE_KEYS = {
  EVENTS: 'calendar-events',
  THEME: 'calendar-theme',
  SETTINGS: 'calendar-settings',
  VIEW_MODE: 'calendar-view-mode'
};

/**
 * Safely gets an item from localStorage
 * @param {string} key - The storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} The stored value or default value
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    
    // Try to parse as JSON, return as string if it fails
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  } catch (error) {
    console.warn(`Error reading from localStorage for key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Safely sets an item in localStorage
 * @param {string} key - The storage key
 * @param {*} value - The value to store
 * @returns {boolean} True if successful, false otherwise
 */
export const setStorageItem = (key, value) => {
  try {
    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.warn(`Error writing to localStorage for key "${key}":`, error);
    return false;
  }
};

/**
 * Safely removes an item from localStorage
 * @param {string} key - The storage key
 * @returns {boolean} True if successful, false otherwise
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Error removing from localStorage for key "${key}":`, error);
    return false;
  }
};

/**
 * Gets all events from localStorage
 * @returns {Array} Array of events
 */
export const getEvents = () => {
  return getStorageItem(STORAGE_KEYS.EVENTS, []);
};

/**
 * Saves events to localStorage
 * @param {Array} events - Array of events to save
 * @returns {boolean} True if successful
 */
export const saveEvents = (events) => {
  return setStorageItem(STORAGE_KEYS.EVENTS, events);
};

/**
 * Gets theme preference from localStorage
 * @returns {string} Theme preference ('light' or 'dark')
 */
export const getThemePreference = () => {
  return getStorageItem(STORAGE_KEYS.THEME, 'light');
};

/**
 * Saves theme preference to localStorage
 * @param {string} theme - Theme preference
 * @returns {boolean} True if successful
 */
export const saveThemePreference = (theme) => {
  return setStorageItem(STORAGE_KEYS.THEME, theme);
};

/**
 * Gets view mode preference from localStorage
 * @returns {string} View mode ('grid' or 'list')
 */
export const getViewModePreference = () => {
  return getStorageItem(STORAGE_KEYS.VIEW_MODE, 'grid');
};

/**
 * Saves view mode preference to localStorage
 * @param {string} viewMode - View mode preference
 * @returns {boolean} True if successful
 */
export const saveViewModePreference = (viewMode) => {
  return setStorageItem(STORAGE_KEYS.VIEW_MODE, viewMode);
};

/**
 * Gets app settings from localStorage
 * @returns {Object} Settings object
 */
export const getSettings = () => {
  return getStorageItem(STORAGE_KEYS.SETTINGS, {
    notifications: true,
    defaultEventDuration: 60, // minutes
    weekStartDay: 0, // 0 = Sunday, 1 = Monday
    timeFormat: '12h', // '12h' or '24h'
    defaultView: 'grid',
    autoSave: true
  });
};

/**
 * Saves app settings to localStorage
 * @param {Object} settings - Settings object
 * @returns {boolean} True if successful
 */
export const saveSettings = (settings) => {
  return setStorageItem(STORAGE_KEYS.SETTINGS, settings);
};

/**
 * Updates a specific setting
 * @param {string} key - Setting key
 * @param {*} value - Setting value
 * @returns {boolean} True if successful
 */
export const updateSetting = (key, value) => {
  const currentSettings = getSettings();
  const updatedSettings = { ...currentSettings, [key]: value };
  return saveSettings(updatedSettings);
};

/**
 * Clears all app data from localStorage
 * @returns {boolean} True if successful
 */
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.warn('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Gets localStorage usage info
 * @returns {Object} Usage information
 */
export const getStorageInfo = () => {
  try {
    let totalSize = 0;
    const items = {};
    
    Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
      const item = localStorage.getItem(key);
      const size = item ? new Blob([item]).size : 0;
      items[name] = { key, size, sizeKB: Math.round(size / 1024 * 100) / 100 };
      totalSize += size;
    });
    
    return {
      totalSize,
      totalSizeKB: Math.round(totalSize / 1024 * 100) / 100,
      items,
      available: typeof navigator !== 'undefined' && 'storage' in navigator,
      quota: null // Would need to use navigator.storage.estimate() for this
    };
  } catch (error) {
    console.warn('Error getting storage info:', error);
    return {
      totalSize: 0,
      totalSizeKB: 0,
      items: {},
      available: false,
      quota: null
    };
  }
};

/**
 * Exports all data as JSON
 * @returns {string} JSON string of all data
 */
export const exportData = () => {
  try {
    const data = {};
    Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
      data[name] = getStorageItem(key);
    });
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.warn('Error exporting data:', error);
    return '';
  }
};

/**
 * Imports data from JSON string
 * @param {string} jsonData - JSON string of data to import
 * @returns {boolean} True if successful
 */
export const importData = (jsonData) => {
  try {
    const data = JSON.parse(jsonData);
    let success = true;
    
    Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
      if (data[name] !== undefined) {
        const result = setStorageItem(key, data[name]);
        success = success && result;
      }
    });
    
    return success;
  } catch (error) {
    console.warn('Error importing data:', error);
    return false;
  }
};
