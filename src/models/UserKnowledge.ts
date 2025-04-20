import mongoose, { Document } from 'mongoose';

export interface UserKnowledgeDocument extends Document {
    username: string;
    knowledge: Record<string, any>;
    updated_at: string;
}

const userKnowledgeSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    knowledge: { 
        type: mongoose.Schema.Types.Mixed, 
        required: true,
        default: {} 
    },
    updated_at: { 
        type: String, 
        default: () => new Date().toISOString() 
    }
});

const UserKnowledge = mongoose.model<UserKnowledgeDocument>('UserKnowledge', userKnowledgeSchema);

// Database operations
export const createOrUpdateUserKnowledge = async (username: string, knowledge: Record<string, any>) => {
    return await UserKnowledge.findOneAndUpdate(
        { username },
        { 
            knowledge,
            updated_at: new Date().toISOString()
        },
        { 
            new: true,
            upsert: true 
        }
    );
};

export const getUserKnowledge = async (username: string) => {
    return await UserKnowledge.findOne({ username });
};

export const deleteUserKnowledge = async (username: string) => {
    return await UserKnowledge.findOneAndDelete({ username });
};

export default UserKnowledge;