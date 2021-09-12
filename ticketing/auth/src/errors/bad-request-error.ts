import { CommonErrorMessage, CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(message: string) {
        super(message);
    }

    serializeErrors(): CommonErrorMessage[] {
        return [{ message: this.message }];
    }
}