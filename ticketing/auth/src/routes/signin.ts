import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import * as jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../libs/password';
import { validateRequest } from '../middleware/validate-request';
import { User } from '../models/user';

const router = Router();

const signinValidator = [
    body('email')
        .isEmail()
        .withMessage('Email is required!'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required!')
];

router.post('/api/users/signin', signinValidator, validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const storedPassword = user && user.password;

    if (!storedPassword || !await Password.compare(password, storedPassword)) {
        throw new BadRequestError('Invalid credentials');
    }

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    req.session = { ...req.session, ...{ jwt: userJwt }};

    return res.status(200).send('login successful');
});

export { router as signinRouter };