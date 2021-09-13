import { Router, Request, Response } from 'express';
import { body} from 'express-validator';
import * as jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { validateRequest } from '../middleware/validate-request';

const router = Router();

const signupValidator = [
    body('email').isEmail().withMessage('Email is required!'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 - 20 characters!')
];

router.post('/api/users/signup', signupValidator, validateRequest, async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    req.session = { ...req.session, ...{ jwt: userJwt }};

    res.status(201).send(user);
});

export { router as signupRouter };