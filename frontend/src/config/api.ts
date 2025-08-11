// API Configuration
export const API_CONFIG = {
  // Base URL for API calls
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  
  // API Endpoints
  ENDPOINTS: {
    // Auth endpoints
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
      VERIFY_EMAIL: '/api/auth/verify-email',
      FORGOT_PASSWORD: '/api/auth/forgot-password',
      RESET_PASSWORD: '/api/auth/reset-password',
      REFRESH_TOKEN: '/api/auth/refresh-token',
    },
    
    // Facility endpoints
    FACILITIES: {
      LIST: '/api/facilities',
      DETAIL: (id: string) => `/api/facilities/${id}`,
      CREATE: '/api/facilities',
      UPDATE: (id: string) => `/api/facilities/${id}`,
      DELETE: (id: string) => `/api/facilities/${id}`,
    },
    
    // Court endpoints
    COURTS: {
      LIST: '/api/courts',
      DETAIL: (id: string) => `/api/courts/${id}`,
      CREATE: '/api/courts',
      UPDATE: (id: string) => `/api/courts/${id}`,
      DELETE: (id: string) => `/api/courts/${id}`,
      BY_FACILITY: (facilityId: string) => `/api/courts/facility/${facilityId}`,
    },
    
    // Booking endpoints
    BOOKINGS: {
      LIST: '/api/bookings',
      DETAIL: (id: string) => `/api/bookings/${id}`,
      CREATE: '/api/bookings',
      UPDATE: (id: string) => `/api/bookings/${id}`,
      DELETE: (id: string) => `/api/bookings/${id}`,
      USER_BOOKINGS: '/api/bookings/user',
      COURT_BOOKINGS: (courtId: string) => `/api/bookings/court/${courtId}`,
    },
    
    // Payment endpoints
    PAYMENTS: {
      CREATE_INTENT: '/api/payments/create-intent',
      CONFIRM_PAYMENT: '/api/payments/confirm',
      PAYMENT_HISTORY: '/api/payments/history',
      WEBHOOK: '/api/payments/webhook',
    },
  },
  
  // Request configuration
  REQUEST_CONFIG: {
    TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 second
  },
  
  // HTTP Status codes
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  },
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get auth headers
export const getAuthHeaders = (): Record<string, string> => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  return {};
};
