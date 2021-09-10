export interface CommonErrorMessage {
    message: string;
    field?: string;
}

export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract serializeErrors(): CommonErrorMessage[];

    constructor(message: string) {
        super(message);
    }
}