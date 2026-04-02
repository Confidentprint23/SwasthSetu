const MESSAGES = {
  // Auth messages
  REGISTRATION_SUCCESS: 'Registration successful',
  LOGIN_SUCCESS: 'Login successful',
  LOGIN_FAILED: 'Invalid credentials',
  LOGOUT_SUCCESS: 'Logged out successfully',
  UNAUTHORIZED: 'Unauthorized access',
  INVALID_TOKEN: 'Invalid or expired token',

  // Consultation messages
  CONSULTATION_BOOKED: 'Consultation booked successfully',
  CONSULTATION_CANCELLED: 'Consultation cancelled',
  CONSULTATION_NOT_FOUND: 'Consultation not found',
  DOCTOR_NOT_AVAILABLE: 'Doctor not available at selected time',

  // Health records
  RECORD_CREATED: 'Health record created',
  RECORD_UPDATED: 'Health record updated',
  RECORD_NOT_FOUND: 'Health record not found',

  // Prescription
  PRESCRIPTION_ISSUED: 'Prescription issued successfully',
  PRESCRIPTION_NOT_FOUND: 'Prescription not found',

  // Doctor
  DOCTOR_PROFILE_UPDATED: 'Doctor profile updated',
  AVAILABILITY_UPDATED: 'Availability updated',
  DOCTOR_NOT_FOUND: 'Doctor not found',

  // Pharmacy
  PHARMACY_NOT_FOUND: 'Pharmacy not found',
  MEDICINE_NOT_AVAILABLE: 'Medicine not available',
  AVAILABILITY_CHECKED: 'Availability checked',

  // Symptom checker
  ASSESSMENT_COMPLETED: 'Assessment completed',
  ASSESSMENT_NOT_FOUND: 'Assessment not found',

  // Profile
  PROFILE_UPDATED: 'Profile updated successfully',
  PROFILE_NOT_FOUND: 'Profile not found',

  // Server errors
  INTERNAL_ERROR: 'Internal server error',
  VALIDATION_ERROR: 'Validation failed',
  DATABASE_ERROR: 'Database operation failed',
};

const ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
};

const CONSULTATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

const RISK_LEVELS = {
  LOW: { min: 0, max: 30, label: 'Low Risk' },
  MODERATE: { min: 31, max: 60, label: 'Moderate Risk' },
  HIGH: { min: 61, max: 85, label: 'High Risk' },
  CRITICAL: { min: 86, max: 100, label: 'Critical Risk' },
};

module.exports = {
  MESSAGES,
  ROLES,
  CONSULTATION_STATUS,
  RISK_LEVELS,
};