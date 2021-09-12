import { Router, Request, Response } from 'express';
import { User } from '../models/user';

const router = Router();

router.post('/api/users/signin', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err: any, doc: any) => {
        if (err) { console.log(err); }

        res.send(doc);
    });
});

export { router as signinRouter };