import { Router, Request, Response } from 'express';

const router = Router();

router.get('/api/users/currentuser', (req: Request, res: Response) => {
    res.send('current user');
});

export { router as currentUserRouter };