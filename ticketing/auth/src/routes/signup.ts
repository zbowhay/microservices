import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

const router = Router();

const signupValidator = [
    body('email').isEmail().withMessage('Email is required!'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 - 20 characters!')
];

router.post('/api/users/signup', signupValidator, (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    res.send({ email, password });
});

export { router as signupRouter };