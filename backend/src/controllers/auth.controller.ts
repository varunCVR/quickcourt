import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password, fullName, role } = req.body;

        if (!email || !password || !fullName) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { email, password: hashedPassword, fullName, role }
        });

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ token, user });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.json({ token, user });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

export const getCurrentUser = async (req: Request & { user?: any }, res: Response) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.id } });
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: 'Fetching user failed', error: error.message });
    }
};
