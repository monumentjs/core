import { Observable, Observer } from '@monument/reactive';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

export interface HttpServerOptions {
    readonly port: number;
    readonly host?: string;
    readonly backlog?: number;
    readonly requestTimeout?: number;
    readonly keepAliveTimeout?: number;
    readonly maxHeadersCount?: number;
}

export class HttpServer extends Observable<[HttpRequest, HttpResponse]> {
    private _server?: Server;

    public constructor({
        host = 'localhost',
        port = 3_000,
        backlog = 10_000,
        requestTimeout = 120_000,
        keepAliveTimeout = 5_000,
        maxHeadersCount = 2_000
    }: HttpServerOptions) {
        super((observer: Observer<[HttpRequest, HttpResponse]>) => {
            if (this._server == null) {
                this._server = createServer();
                this._server.timeout = requestTimeout;
                this._server.keepAliveTimeout = keepAliveTimeout;
                this._server.maxHeadersCount = maxHeadersCount;
                this._server.listen(port, host, backlog);
            }

            this._server.on('request', (incomingMessage: IncomingMessage, serverResponse: ServerResponse) => {
                observer.next([new HttpRequest(incomingMessage), new HttpResponse(serverResponse)]);
            });

            this._server.on('error', (error: Error) => {
                observer.error(error);
            });

            this._server.on('close', () => {
                observer.complete();
            });

            return () => {
                if (this.observersCount === 0 && this._server != null) {
                    this._server.close();
                    this._server = undefined;
                }
            };
        });
    }
}
