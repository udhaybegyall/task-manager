import express, { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const router = express.Router();

// POST to register a new user
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: `Invalid email ${email}` });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: `User with ${email} created successfully` });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

// POST to login a user
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt: ', email, password);
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { 
            expiresIn: '1h' 
        });
        res.json({ token, userId: user._id, username: user.username });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

export default router;