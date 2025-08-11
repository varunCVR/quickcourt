import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';

// Create an instance of PrismaClient
export const prisma = new PrismaClient();

// Initialize the express app
const app: Express = express();
const PORT = process.env['PORT'] || 8000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// Simple route for testing
app.get('/', (req: Request, res: Response) => {
    res.send('QuickCourt API is running!');
});


// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});