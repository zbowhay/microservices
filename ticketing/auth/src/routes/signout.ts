import { Router, Request, Response } from 'express';

const router = Router();

router.post('/api/users/signout', (req: Request, res: Response) => {
    req.session = null;

    res.status(200).send({});
});

export { router as signoutRouter };