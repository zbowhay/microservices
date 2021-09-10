import { Router, Request, Response } from 'express';

const router = Router();

router.get('/api/users/signout', (req: Request, res: Response) => {
    res.send('sign out');
});

export { router as signoutRouter };