export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  DOCTORS: '/doctors',
  BOOK_CONSULTATION: '/book-consultation',
  CONSULTATIONS: '/consultations',
  HEALTH_RECORDS: '/health-records',
  SYMPTOM_CHECKER: '/symptom-checker',
  PHARMACIES: '/pharmacies',
  PROFILE: '/profile',
  ABOUT: '/about',
  CONTACT: '/contact',
  FORGOT_PASSWORD: '/forgot-password',
  NOT_FOUND: '/404',
};

export const CONSULTATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const RISK_LEVELS = {
  LOW: { min: 0, max: 30, label: 'Low Risk', color: '#4caf50' },
  MODERATE: { min: 31, max: 60, label: 'Moderate Risk', color: '#ff9800' },
  HIGH: { min: 61, max: 85, label: 'High Risk', color: '#ff5722' },
  CRITICAL: { min: 86, max: 100, label: 'Critical Risk', color: '#f44336' },
};

export const USER_ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
};

export const CONSULTATION_TYPES = {
  VIDEO: 'video',
  AUDIO: 'audio',
  TEXT: 'text',
};

export const MESSAGES = {
  LOADING: 'Loading...',
  ERROR: 'An error occurred. Please try again.',
  SUCCESS: 'Operation completed successfully.',
  UNAUTHORIZED: 'Please log in to continue.',
  NOT_FOUND: 'Resource not found.',
};