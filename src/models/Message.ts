import mongoose, { Document } from 'mongoose';

export interface MessageDocument extends Document {
    thread_id: mongoose.Types.ObjectId;
    sender_type: 'user' | 'BOB';
    content: string;
    created_at: string;
}

const messageSchema = new mongoose.Schema({
    thread_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true },
    sender_type: { type: String, enum: ['user', 'BOB'], required: true },
    content: { type: String, required: true },
    created_at: { type: String, default: () => new Date().toISOString() }
});

const Message = mongoose.model<MessageDocument>('Message', messageSchema);

// Database operations
export const createMessage = async (thread_id: string, sender_type: 'user' | 'BOB', content: string) => {
    return await Message.create({ thread_id, sender_type, content });
};

export const getMessagesByThread = async (thread_id: string) => {
    return await Message.find({ thread_id }).sort({ created_at: 1 });
};

export const deleteMessage = async (id: string) => {
    return await Message.findByIdAndDelete(id);
};

export const updateMessage = async (id: string, content: string) => {
    return await Message.findByIdAndUpdate(id, { content }, { new: true });
};

export default Message;