# QuickCourt Backend Setup

## Database Setup

1. Install PostgreSQL on your system
2. Create a database named `quickcourt_db`
3. Update the `DATABASE_URL` in `.env.local` with your PostgreSQL credentials

## Installation

```bash
npm install
```

## Database Migration

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Setup sample data
npm run db:setup
node scripts/run-sample-data.bat
```

## Environment Variables

Update `.env.local` with your actual values:

```
DATABASE_URL="postgresql://username:password@localhost:5432/quickcourt_db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="your-jwt-secret-here"
EMAIL_SERVICE_API_KEY="your-email-service-key"
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify` - Email verification

### Venues

- `GET /api/venues` - Get all approved venues with filters
- `GET /api/venues/[id]` - Get single venue details

### Bookings

- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings

### Facilities (Owner)

- `POST /api/facilities` - Create facility
- `GET /api/facilities` - Get owner facilities

### Admin

- `GET /api/admin/users` - Get all users
- `PATCH /api/admin/users` - Ban/unban users
- `PATCH /api/admin/facilities/approve` - Approve/reject facilities

## Sample Users

After running `npm run db:setup`:

- **Admin**: admin@quickcourt.com / admin123
- **Facility Owner**: owner@quickcourt.com / owner123

## Development

```bash
npm run dev
```

The backend API will be available at `http://localhost:3000/api`
