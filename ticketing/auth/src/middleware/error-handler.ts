import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ errors: err.serializeErrors() });
        }

        res.status(500).send({
            message: err.message
        });
    }

    next();
};
