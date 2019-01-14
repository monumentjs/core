import {Observer} from '@monument/reactive';
import {ServerResponse} from 'http';
import {HttpException} from './HttpException';

export class HttpResponse implements Observer<Buffer | string> {
    private readonly _response: ServerResponse;

    public constructor(response: ServerResponse) {
        this._response = response;
    }

    public complete(): void {
        this._response.end();
    }

    public error(ex: Error): void {
        if (this._response.headersSent === false) {
            if (ex instanceof HttpException) {
                this._response.statusCode = ex.statusCode;
                this._response.end(ex.message);
            } else {
                this._response.statusCode = 500;
                this._response.end(ex.message);
            }
        }
    }

    public next(value: Buffer | string): void {
        this._response.write(value);
    }
}
