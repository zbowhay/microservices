import { CommonErrorMessage, CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Route not found');
    }

    serializeErrors(): CommonErrorMessage[] {
        return [{ message: 'Not Found' }];
    }
}