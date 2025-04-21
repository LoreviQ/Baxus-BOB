import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const isDevelopment = process.env.NODE_ENV !== 'production';
        const connectionString = isDevelopment 
            ? 'mongodb://localhost:27017/baxus'
            : process.env.MONGODB_CONN;

        if (!connectionString) {
            throw new Error('MongoDB connection string is not defined in environment variables');
        }

        const conn = await mongoose.connect(connectionString);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Environment: ${isDevelopment ? 'development' : 'production'}`);
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};