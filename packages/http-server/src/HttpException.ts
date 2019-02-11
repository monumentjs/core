import { RuntimeException } from '@monument/core';

export class HttpException extends RuntimeException {
    public readonly statusCode: number;

    public constructor(statusCode: number, message: string, reason?: Error) {
        super(message, reason);

        this.statusCode = statusCode;
    }
}
