// Shared types for QuickCourt application
// This file can be imported by both frontend and backend

// User related types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  FACILITY_OWNER = 'FACILITY_OWNER',
}

// Facility related types
export interface Facility {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website?: string;
  images: string[];
  amenities: string[];
  operatingHours: OperatingHours;
  ownerId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OperatingHours {
  monday: TimeRange;
  tuesday: TimeRange;
  wednesday: TimeRange;
  thursday: TimeRange;
  friday: TimeRange;
  saturday: TimeRange;
  sunday: TimeRange;
}

export interface TimeRange {
  open: string; // HH:MM format
  close: string; // HH:MM format
  isClosed: boolean;
}

// Court related types
export interface Court {
  id: string;
  name: string;
  facilityId: string;
  sportType: SportType;
  surfaceType: SurfaceType;
  courtSize: CourtSize;
  hourlyRate: number;
  isAvailable: boolean;
  images: string[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum SportType {
  TENNIS = 'TENNIS',
  BASKETBALL = 'BASKETBALL',
  VOLLEYBALL = 'VOLLEYBALL',
  BADMINTON = 'BADMINTON',
  SQUASH = 'SQUASH',
  RACQUETBALL = 'RACQUETBALL',
  PICKLEBALL = 'PICKLEBALL',
  OTHER = 'OTHER',
}

export enum SurfaceType {
  HARD_COURT = 'HARD_COURT',
  CLAY = 'CLAY',
  GRASS = 'GRASS',
  CARPET = 'CARPET',
  ARTIFICIAL_GRASS = 'ARTIFICIAL_GRASS',
  OTHER = 'OTHER',
}

export enum CourtSize {
  SINGLES = 'SINGLES',
  DOUBLES = 'DOUBLES',
  FULL_COURT = 'FULL_COURT',
  HALF_COURT = 'HALF_COURT',
}

// Booking related types
export interface Booking {
  id: string;
  userId: string;
  courtId: string;
  facilityId: string;
  startTime: Date;
  endTime: Date;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
}

// Payment related types
export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  stripePaymentIntentId: string;
  status: PaymentStatus;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth related types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Search and filter types
export interface FacilitySearchParams {
  city?: string;
  state?: string;
  sportType?: SportType;
  amenities?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  date?: string;
  time?: string;
}

export interface CourtSearchParams {
  facilityId?: string;
  sportType?: SportType;
  surfaceType?: SurfaceType;
  date?: string;
  time?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}
