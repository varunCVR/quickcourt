# QuickCourt 🏸

A modern sports booking platform built with Next.js, PostgreSQL, and Prisma. Book courts, manage facilities, and enjoy seamless sports experiences.

## ✨ Features

- **Multi-role Authentication** - Users, Facility Owners, and Admins
- **Venue Discovery** - Browse and search sports facilities
- **Court Booking** - Reserve time slots with payment integration
- **Facility Management** - Owners can manage courts and bookings
- **Admin Dashboard** - User management and facility approval
- **Responsive Design** - Works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone and install dependencies**:

   ```bash
   git clone <repository-url>
   cd quickcourt
   npm install
   ```

2. **Setup environment variables**:

   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your database credentials and secrets.

3. **Setup database**:

   ```bash
   # Create PostgreSQL database named 'quickcourt_db'
   npm run db:generate
   npm run db:push
   npm run db:setup
   ```

4. **Start development server**:

   ```bash
   npm run dev
   ```

5. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000)

## 🔐 Test Accounts

| Role  | Email                 | Password | Access               |
| ----- | --------------------- | -------- | -------------------- |
| Admin | admin@quickcourt.com  | admin123 | Full system access   |
| Owner | owner1@quickcourt.com | owner123 | Facility management  |
| User  | alex.tennis@gmail.com | user123  | Booking and browsing |

_See [SAMPLE-LOGIN-DATA.md](SAMPLE-LOGIN-DATA.md) for more test accounts_

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Payments**: Stripe integration
- **Email**: Nodemailer

## 📁 Project Structure

```
quickcourt/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── api/            # API endpoints
│   │   ├── home/           # Dashboard
│   │   ├── venues/         # Venue listing
│   │   ├── booking/        # Booking management
│   │   └── admin/          # Admin panel
│   ├── components/         # React components
│   └── lib/               # Utilities & config
├── prisma/
│   └── schema.prisma      # Database schema
├── scripts/
│   └── setup-db.js        # Database seeding
└── .env.local            # Environment variables
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
npm run db:setup     # Seed database with sample data
```

## 🌟 Key Features

### For Users

- Browse venues with search and filters
- View detailed court information and pricing
- Make bookings with time slot selection
- Manage booking history and profile
- Leave reviews and ratings

### For Facility Owners

- Register and manage facilities
- Add courts with pricing and availability
- View booking analytics and revenue
- Manage court schedules

### For Admins

- User management and moderation
- Facility approval workflow
- System analytics and reports
- Content moderation

## 🔗 API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify` - Email verification

### Venues & Bookings

- `GET /api/venues` - List venues with filters
- `GET /api/venues/[id]` - Venue details
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - User bookings

### Admin & Owner

- `GET /api/admin/users` - User management
- `GET /api/owner/facilities` - Facility management
- `POST /api/facilities` - Create facility

_See [README-BACKEND.md](README-BACKEND.md) for complete API documentation_

## 🎨 UI/UX

- **Modern Design** - Clean, professional interface
- **Responsive Layout** - Mobile-first approach
- **Intuitive Navigation** - Role-based menus
- **Loading States** - Smooth user experience
- **Form Validation** - Real-time feedback

## 🔒 Security

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation and sanitization
- Protected API routes

## 📊 Sample Data

The project includes comprehensive sample data:

- 7 test users across all roles
- 4 premium sports facilities
- 13 courts with different sports
- Realistic booking and payment data
- User reviews and ratings

## 🚀 Deployment

1. **Build the application**:

   ```bash
   npm run build
   ```

2. **Set production environment variables**

3. **Deploy to your preferred platform** (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**QuickCourt** - Making sports booking simple and efficient! 🏆
