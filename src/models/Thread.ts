import mongoose, { Document } from 'mongoose';

export interface ThreadDocument extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    created_at: string;
}

const threadSchema = new mongoose.Schema({
    username: { type: String, required: true },
    created_at: { type: String, default: () => new Date().toISOString() }
});

const Thread = mongoose.model<ThreadDocument>('Thread', threadSchema);

// Database operations
export const createThread = async (username: string) => {
    return await Thread.create({ username });
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