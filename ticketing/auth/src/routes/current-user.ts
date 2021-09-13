import { Router, Request, Response } from 'express';
import { currentUser } from '../middleware/current-user';

const router = Router();

router.get('/api/users/currentuser', currentUser, (req: Request, res: Response) => {
    res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };