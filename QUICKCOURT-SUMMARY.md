# QuickCourt - Complete Sports Booking Platform

## 🎯 Project Overview
QuickCourt is a fully functional sports booking platform built with Next.js, PostgreSQL, and Prisma. Users can browse venues, make bookings, and manage their profiles with role-based access control.

## 🚀 Features Implemented

### ✅ Authentication System
- **User Registration** with role selection (User/Facility Owner)
- **Email Verification** with OTP system
- **JWT-based Authentication** with secure token management
- **Password Hashing** with bcrypt
- **Role-based Access Control** (User, Facility Owner, Admin)

### ✅ User Features
- **Home Dashboard** with popular venues
- **Venue Browsing** with search and filters
- **Venue Details** with courts and pricing
- **Booking Management** (view bookings)
- **User Profile** management

### ✅ Database Schema
- **Users** (authentication, profiles, roles)
- **Facilities** (venues with approval workflow)
- **Courts** (sport types, pricing, availability)
- **Bookings** (reservations with time slots)
- **Reviews** (venue ratings and comments)
- **Reports** (moderation system)

### ✅ API Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `POST /api/auth/verify` - Email verification
- `GET /api/venues` - List venues with filters
- `GET /api/venues/[id]` - Single venue details
- `GET /api/bookings` - User bookings
- `POST /api/bookings` - Create booking
- `GET /api/facilities` - Facility management
- `GET /api/admin/users` - Admin user management

## 🛠 Tech Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT, bcrypt
- **Styling**: Tailwind CSS with custom components

## 📁 Project Structure
```
qc/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── api/            # API routes
│   │   ├── home/           # Home dashboard
│   │   ├── venues/         # Venue listing
│   │   ├── booking/        # Booking management
│   │   ├── profile/        # User profile
│   │   └── signup/         # Registration
│   ├── components/         # Reusable components
│   │   ├── auth/          # Authentication forms
│   │   └── venue/         # Venue components
│   └── lib/               # Utilities
│       ├── prisma.ts      # Database client
│       └── auth.ts        # Auth utilities
├── prisma/
│   └── schema.prisma      # Database schema
├── scripts/
│   └── setup-db.js        # Database seeding
└── .env.local            # Environment variables
```

## 🗄 Database Schema Highlights
- **Multi-role system** (User, Facility Owner, Admin)
- **Facility approval workflow** for quality control
- **Time slot management** for booking availability
- **Review and rating system** for venues
- **Report system** for moderation

## 🎨 UI/UX Features
- **Responsive design** for all screen sizes
- **Modern purple/blue theme** with clean aesthetics
- **Intuitive navigation** with role-based menus
- **Loading states** and error handling
- **Form validation** and user feedback

## 🔐 Security Features
- **Password hashing** with bcrypt
- **JWT token authentication** with expiration
- **Role-based access control** for API endpoints
- **Input validation** and sanitization
- **Protected routes** with authentication checks

## 📊 Sample Data Included
- **Admin user**: admin@quickcourt.com / admin123
- **Facility owner**: owner@quickcourt.com / owner123
- **Regular user**: user@quickcourt.com / user123
- **Sample facilities** with courts and time slots
- **Sample reviews** and ratings

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Setup PostgreSQL database**:
   - Create database: `quickcourt_db`
   - Update `.env` with your credentials

3. **Initialize database**:
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:setup
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Frontend: http://localhost:3000
   - Login with sample users or create new account

## 🎯 Key Achievements
✅ **Complete authentication system** with OTP verification
✅ **Role-based access control** for different user types
✅ **Comprehensive database design** with relationships
✅ **RESTful API** with proper error handling
✅ **Modern responsive UI** with Tailwind CSS
✅ **Search and filtering** functionality
✅ **Booking management** system
✅ **Admin panel** capabilities
✅ **Sample data** for testing

## 🔄 Future Enhancements
- Payment gateway integration
- Real-time booking notifications
- Advanced admin dashboard
- Mobile app development
- Social features and community
- Advanced reporting and analytics

## 📝 Notes
- All passwords are hashed with bcrypt
- JWT tokens expire in 7 days
- Database includes proper foreign key relationships
- API includes proper error handling and validation
- UI is fully responsive and accessible

The QuickCourt platform is now fully functional and ready for use! 🎉