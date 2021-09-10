import { CommonErrorMessage, CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to database';

    constructor() {
        super('Database connection error');
    }

    serializeErrors(): CommonErrorMessage[] {
        return [{ message: this.reason }];
    }
}