import { Request, Response, Router } from 'express';

const router = Router();

router.get('/helloworld', (req: Request, res: Response) => {
    res.json({ message: 'Hello, World!' });
});

export default router;