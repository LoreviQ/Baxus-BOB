import { Router } from 'express';
import { handleMessage } from '@/controllers/BOB';

const router = Router();

router.post('/bob/message', handleMessage);

export default router;