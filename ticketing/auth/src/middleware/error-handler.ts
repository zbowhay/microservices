import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

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
