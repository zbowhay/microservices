import { ValidationError } from 'express-validator';
import { CommonErrorMessage, CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(private errors: ValidationError[]) {
        super('Invalid request parameters');
    }

    serializeErrors(): CommonErrorMessage[] {
        return this.errors.map(err => ({ message: err.msg, field: err.param }));
    }
}
