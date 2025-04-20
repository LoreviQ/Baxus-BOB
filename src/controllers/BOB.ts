import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { createMessage, getMessagesByThread } from '@/models/Message';
import { createThread, getThreadById, getThreadsByUsername, ThreadDocument } from '@/models/Thread';
import { buildBOB } from '@/agent/BOB';

interface MessageRequest {
    username: string;
    thread: string;
    content: string;
}

export const handleMessage = async (req: Request<{}, {}, MessageRequest>, res: Response) => {
    try {
        const { username, thread, content } = req.body;
        
        // If no thread ID is provided, create a new thread
        let threadDoc = thread ? await getThreadById(thread) : null;
        if (!threadDoc) {
            const newThread = await createThread(username);
            threadDoc = newThread as mongoose.Document<unknown, {}, ThreadDocument> & 
                                  ThreadDocument & 
                                  Required<{ _id: mongoose.Types.ObjectId }> & 
                                  { __v: number };
        }

        if (!threadDoc) {
            throw new Error('Failed to create or retrieve thread');
        }

        // Store the user's message
        await createMessage(threadDoc._id.toString(), 'user', content);
        
        // -------- BOB LOGIC HERE --------
        const bob = buildBOB();
        const bobsMessage = await bob.generateResponse();
        const bobsMessageString = typeof bobsMessage === 'string' ? bobsMessage : JSON.stringify(bobsMessage);
        // --------------------------------

        // Store BOB's response
        const bobResponse = await createMessage(threadDoc._id.toString(), 'BOB', bobsMessageString);

        res.json({ 
            status: 'success', 
            message : {
                id: bobResponse._id,
                thread_id: bobResponse.thread_id,
                content: bobResponse.content,
                sender_type: bobResponse.sender_type,
                created_at: bobResponse.created_at
            }
        });
    } catch (error) {
        console.error('Error handling message:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

export const getThreadMessages = async (req: Request<{ threadId: string }>, res: Response) => {
    try {
        const messages = await getMessagesByThread(req.params.threadId);
        res.json({ status: 'success', messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

export const getUserThreads = async (req: Request<{ username: string }>, res: Response) => {
    try {
        const threads = await getThreadsByUsername(req.params.username);
        res.json({ status: 'success', threads });
    } catch (error) {
        console.error('Error fetching threads:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};