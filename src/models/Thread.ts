import mongoose, { Document } from 'mongoose';
import { createMessage } from './Message';

export interface ThreadDocument extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    created_at: string;
}

const threadSchema = new mongoose.Schema({
    username: { type: String, required: true },
    created_at: { type: String, default: () => new Date().toISOString() }
});

const defaultMessage = `Hello! I'm BOB, the BAXUS Outstanding Butler, your friendly whiskey expert and AI assistant within the BAXUS ecosystem. I noticed you've been building up a fascinating virtual bar!

If you're open to it, I'd love to analyze your current collection. I can then provide personalized recommendations for new bottles based on your apparent preferences. Think of me as your guide to discovering your next favorite dram!`;


const Thread = mongoose.model<ThreadDocument>('Thread', threadSchema);

// Database operations
export const createThread = async (username: string) => {
    const thread = await Thread.create({ username });
    await createMessage(thread._id.toString(), 'BOB', defaultMessage);
    return thread;
};

export const getThreadsByUsername = async (username: string) => {
    return await Thread.find({ username });
};

export const getThreadById = async (id: string) => {
    return await Thread.findById(id);
};

export const deleteThread = async (id: string) => {
    return await Thread.findByIdAndDelete(id);
};

export default Thread;