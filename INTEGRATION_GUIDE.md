# QuickCourt Integration Guide

## 🎯 What Has Been Integrated

Your QuickCourt application has been successfully integrated with the following features:

### 1. **Project Structure Integration**
- **Root Package Management**: Single `package.json` to manage both backend and frontend
- **Workspace Configuration**: npm workspaces for better dependency management
- **Unified Scripts**: Commands to run both services simultaneously

### 2. **Configuration Management**
- **Environment Variables**: Centralized configuration for both services
- **API Configuration**: Frontend knows how to communicate with backend
- **CORS Setup**: Backend configured to accept requests from frontend

### 3. **Development Workflow**
- **Concurrent Development**: Run both services with single command
- **Docker Support**: Optional containerized development environment
- **Database Integration**: Prisma setup with PostgreSQL

### 4. **Type Safety & Consistency**
- **Shared Types**: Common interfaces between frontend and backend
- **API Contracts**: Consistent data structures across the stack
- **Validation**: Zod schemas for data validation

## 🚀 How to Use the Integrated Setup

### Quick Start (Recommended)
```bash
# Install all dependencies
npm run install:all

# Setup environment files
npm run setup

# Start both services
npm run dev
```

### Manual Setup
```bash
# 1. Install root dependencies
npm install

# 2. Install backend dependencies
cd backend && npm install && cd ..

# 3. Install frontend dependencies
cd frontend && npm install && cd ..

# 4. Setup environment files
cp backend/env.example backend/.env
cp frontend/env.example frontend/.env.local

# 5. Start development
npm run dev
```

### Docker Development
```bash
# Start with Docker Compose
npm run docker

# Or manually
docker-compose up
```

## 🔧 Available Commands

### Root Level Commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Start both backend and frontend |
| `npm run build` | Build both projects |
| `npm run start` | Start both in production mode |
| `npm run install:all` | Install all dependencies |

### Database Commands
| Command | Description |
|---------|-------------|
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with data |
| `npm run db:studio` | Open Prisma Studio |

### Individual Service Commands
| Command | Description |
|---------|-------------|
| `npm run dev:backend` | Start only backend |
| `npm run dev:frontend` | Start only frontend |
| `npm run build:backend` | Build only backend |
| `npm run build:frontend` | Build only frontend |

## 🌐 Service URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Database**: localhost:5432 (PostgreSQL)
- **Redis**: localhost:6379 (if using Docker)

## 🔐 Environment Configuration

### Backend (.env)
```env
PORT=8000
NODE_ENV=development
DATABASE_URL="postgresql://username:password@localhost:5432/quickcourt_db"
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
STRIPE_SECRET_KEY=your-stripe-key
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=QuickCourt
```

## 📁 File Structure After Integration

```
quickcourt/
├── package.json                 # Root package management
├── docker-compose.yml          # Docker development environment
├── scripts/                    # Development scripts
│   ├── dev.sh                 # Unix/Mac development script
│   └── dev.bat                # Windows development script
├── shared/                     # Shared types and utilities
│   └── types.ts               # Common TypeScript interfaces
├── backend/                    # Express.js API server
│   ├── src/
│   │   ├── config/            # Configuration management
│   │   │   └── config.ts      # Centralized config
│   │   └── ...                # Existing backend code
│   ├── env.example            # Environment template
│   └── Dockerfile.dev         # Development Dockerfile
├── frontend/                   # Next.js application
│   ├── src/
│   │   ├── config/            # Frontend configuration
│   │   │   └── api.ts         # API endpoints config
│   │   ├── components/        # UI components
│   │   │   └── ApiTest.tsx    # API connection tester
│   │   └── ...                # Existing frontend code
│   ├── env.example            # Environment template
│   └── Dockerfile.dev         # Development Dockerfile
└── README.md                   # Project documentation
```

## 🔄 Development Workflow

### 1. **Start Development**
```bash
npm run dev
```
This starts both backend (port 8000) and frontend (port 3000) simultaneously.

### 2. **Make Changes**
- **Backend**: Edit files in `backend/src/` - auto-reloads
- **Frontend**: Edit files in `frontend/src/` - hot reloads
- **Database**: Use Prisma commands for schema changes

### 3. **Test Integration**
- Use the `ApiTest` component in frontend to verify API connectivity
- Check browser console for any CORS or connection errors
- Monitor backend logs for incoming requests

### 4. **Database Changes**
```bash
# After modifying Prisma schema
npm run db:generate
npm run db:migrate

# Or push changes directly (development)
npm run db:push
```

## 🐛 Troubleshooting

### Common Issues

#### 1. **Port Already in Use**
```bash
# Check what's using the ports
netstat -ano | findstr :8000
netstat -ano | findstr :3000

# Kill the process or change ports in .env files
```

#### 2. **Database Connection Issues**
```bash
# Ensure PostgreSQL is running
# Check DATABASE_URL in backend/.env
# Verify database exists
```

#### 3. **CORS Errors**
- Ensure `FRONTEND_URL` in backend `.env` matches frontend URL
- Check that backend is running on correct port
- Verify CORS configuration in `backend/src/config/config.ts`

#### 4. **Dependencies Issues**
```bash
# Clean install
rm -rf node_modules package-lock.json
rm -rf backend/node_modules backend/package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
npm run install:all
```

### Debug Mode
```bash
# Start with more verbose logging
DEBUG=* npm run dev:backend
```

## 🚀 Production Deployment

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
Ensure all production environment variables are set:
- Database connection strings
- JWT secrets
- Stripe keys
- CORS origins (production domains)

## 📚 Next Steps

1. **Customize Environment**: Update `.env` files with your actual values
2. **Database Setup**: Configure PostgreSQL and run migrations
3. **Stripe Integration**: Add your Stripe keys for payment processing
4. **Frontend Styling**: Customize the UI components and styling
5. **Testing**: Add unit and integration tests
6. **Deployment**: Set up production deployment pipeline

## 🆘 Getting Help

- **Documentation**: Check the main README.md
- **API Testing**: Use the ApiTest component to verify connectivity
- **Logs**: Monitor backend console and frontend browser console
- **Database**: Use Prisma Studio for database inspection

---

**Your QuickCourt application is now fully integrated and ready for development! 🎾🏀⚽**
