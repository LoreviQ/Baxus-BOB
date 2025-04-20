import express, { Request, Response, NextFunction } from 'express';
import { connectDB } from '@/config/database';
import BOBRouter from '@/routes/BOB';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Add JSON middleware
app.use(express.json());

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} request at ${req.url}`);
    next();
});

// API routes
app.use('/api/v1', BOBRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});