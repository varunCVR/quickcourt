# QuickCourt - Court Booking Application

A full-stack court booking application built with Next.js frontend and Express.js backend, featuring real-time availability, payment processing, and user management.

## 🏗️ Project Structure

```
quickcourt/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── services/       # Business logic
│   │   ├── config/         # Configuration files
│   │   └── utils/          # Utility functions
│   ├── prisma/             # Database schema and migrations
│   └── package.json        # Backend dependencies
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js 13+ app directory
│   │   ├── components/    # Reusable UI components
│   │   ├── config/        # Frontend configuration
│   │   └── utils/         # Frontend utilities
│   └── package.json       # Frontend dependencies
├── shared/                 # Shared types and utilities
├── package.json            # Root package.json for project management
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Stripe account (for payments)

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd quickcourt

# Install all dependencies (root, backend, and frontend)
npm run install:all
```

### 2. Environment Setup

#### Backend Environment
```bash
cd backend
cp env.example .env
```

Edit `.env` with your configuration:
```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/quickcourt_db"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

#### Frontend Environment
```bash
cd frontend
cp env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Next.js Configuration
NEXT_PUBLIC_APP_NAME=QuickCourt
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed the database with initial data
npm run db:seed

# (Optional) Open Prisma Studio to view/edit data
npm run db:studio
```

### 4. Start Development Servers

```bash
# Start both backend and frontend simultaneously
npm run dev

# Or start them separately:
npm run dev:backend    # Backend on http://localhost:8000
npm run dev:frontend   # Frontend on http://localhost:3000
```

## 🛠️ Available Scripts

### Root Level Scripts
- `npm run dev` - Start both backend and frontend in development mode
- `npm run build` - Build both backend and frontend for production
- `npm run start` - Start both backend and frontend in production mode
- `npm run install:all` - Install dependencies for all projects

### Database Scripts
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

### Utility Scripts
- `npm run clean` - Clean build artifacts
- `npm run lint` - Run linting on all projects

## 🏛️ Architecture

### Backend (Express.js + TypeScript)
- **Framework**: Express.js 5.x with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based with refresh tokens
- **Payment**: Stripe integration
- **Validation**: Zod schema validation
- **CORS**: Configured for frontend integration

### Frontend (Next.js 14 + TypeScript)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **State Management**: React hooks + Context API
- **Type Safety**: TypeScript with shared types
- **API Integration**: Centralized API configuration

### Shared Components
- **Types**: Common TypeScript interfaces and enums
- **Validation**: Shared validation schemas
- **Constants**: Application-wide constants

## 🔐 Authentication Flow

1. User registers/logs in via frontend
2. Backend validates credentials and returns JWT tokens
3. Frontend stores tokens in localStorage
4. Subsequent API calls include JWT in Authorization header
5. Backend middleware validates JWT for protected routes

## 💳 Payment Integration

- Stripe payment intents for secure payment processing
- Webhook handling for payment status updates
- Integration with booking system for automatic payment confirmation

## 🗄️ Database Schema

The application uses Prisma with the following main entities:
- **Users**: User accounts and authentication
- **Facilities**: Sports facilities with location and amenities
- **Courts**: Individual courts within facilities
- **Bookings**: Court reservations with time slots
- **Payments**: Payment records linked to bookings

## 🔧 Development Workflow

1. **Feature Development**: Work on backend API endpoints first, then frontend components
2. **Type Safety**: Update shared types when modifying data structures
3. **Testing**: Test API endpoints with tools like Postman before frontend integration
4. **Database Changes**: Use Prisma migrations for schema changes

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm run build
npm start
```

### Frontend Deployment
```bash
cd frontend
npm run build
npm start
```

### Environment Variables
Ensure all environment variables are properly set in production, especially:
- Database connection strings
- JWT secrets
- Stripe keys
- CORS origins

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Update shared types if needed
5. Test both backend and frontend
6. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the code comments
- Open an issue on GitHub

---

**Happy coding! 🎾🏀⚽**
