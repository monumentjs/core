import {Exception} from '@monument/core';

export class HttpException extends Exception {
    public readonly statusCode: number;

    public constructor(statusCode: number, message: string, reason?: Error) {
        super(message, reason);

        this.statusCode = statusCode;
    }
}
