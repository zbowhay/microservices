import { CustomError, CommonErrorMessage } from './custom-error';

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super('Not Authorized');
    }

    serializeErrors(): CommonErrorMessage[] {
        return [{ message: 'Not authorized' }];
    }
}