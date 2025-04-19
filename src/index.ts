import express from 'express';
import { connectDB } from './config/database';
import BOBRouter from './routes/BOB';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Add JSON middleware
app.use(express.json());
app.use('/v1', BOBRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});