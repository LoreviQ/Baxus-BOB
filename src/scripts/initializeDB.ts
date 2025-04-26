import { connectDB } from '../config/database';
import { loadWhiskeyData } from '../utils/whiskeyLoader';
import WhiskeyData from '../models/WhiskeyData';

async function initializeDatabase() {
    try {
        // Connect to MongoDB
        await connectDB();

        // Check if data already exists
        const existingCount = await WhiskeyData.countDocuments();
        if (existingCount > 0) {
            console.log('Database is already populated. Clearing existing data...');
            await WhiskeyData.deleteMany({});
        }

        // Load data from TSV
        const whiskeyData = loadWhiskeyData();
        console.log(`Loaded ${whiskeyData.length} entries from TSV file`);

        // Insert data into MongoDB
        const result = await WhiskeyData.insertMany(whiskeyData);
        console.log(`Successfully inserted ${result.length} documents into MongoDB`);

        // Create indexes
        await WhiskeyData.createIndexes();
        console.log('Created database indexes');

        // Log a sample query to verify data
        const topWhiskeys = await WhiskeyData.findTopRated(5);
        console.log('\nTop 5 whiskeys by total score:');
        topWhiskeys.forEach(whiskey => {
            console.log(`- ${whiskey.name} (Score: ${whiskey.total_score})`);
        });

    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        // Close the connection
        process.exit();
    }
}

// Run the initialization
initializeDatabase();