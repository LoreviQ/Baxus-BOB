import { Request, Response } from 'express';

interface MessageRequest {
    username: string;
    thread: number;
    content: string;
}

export const handleMessage = (req: Request<{}, {}, MessageRequest>, res: Response) => {
    const { username, thread, content } = req.body;
    
    // Log the received details
    console.log(`Received message from ${username} in thread ${thread}: ${content}`);
    
    res.json({ status: 'success', message: 'Message details received' });
};