import express from 'express';
import { handleMessage, getThreadMessages, getUserThreads } from '../controllers/BOB';

const router = express.Router();

router.post('/message', handleMessage);
router.get('/thread/:threadId/messages', getThreadMessages);
router.get('/user/:username/threads', getUserThreads);

export default router;