import express from 'express';
import { handleMessage, getThreadMessages, getUserThreads } from '../controllers/BOB';

const router = express.Router();

router.post('/messages', handleMessage);
router.get('/threads/:threadId/messages', getThreadMessages);
router.get('/users/:username/threads', getUserThreads);

export default router;