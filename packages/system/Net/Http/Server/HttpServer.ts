import * as http from 'http';
import * as https from 'https';
import {Delegate} from 'core/main/decorators/Delegate';
import {Task} from '@monument/async/main/Task';
import {DeferredObject} from '@monument/async/main/DeferredObject';
import {HttpServerConfiguration} from './HttpServerConfiguration';
import {HttpRequestProcessor} from './HttpRequestProcessor';


export class HttpServer implements Task {
    private _configuration: HttpServerConfiguration;
    private _server: http.Server | https.Server;
    private _requestProcessor: HttpRequestProcessor;


    public get configuration(): HttpServerConfiguration {
        return this._configuration;
    }


    public get isRunning(): boolean {
        return this._server.listening;
    }


    public get connectionsCount(): number {
        return this._server.connections;
    }


    public constructor(configuration: HttpServerConfiguration) {
        this._configuration = configuration;
        this._server = this.createServer();
        this._requestProcessor = this.createRequestProcessor();
    }


    public run(): Promise<void> {
        let deferred: DeferredObject = new DeferredObject();
        let {host, port, backlogSize} = this.configuration;

        this._server.listen(port, host, backlogSize, (error: Error) => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public stop(): Promise<void> {
        let deferred: DeferredObject = new DeferredObject();

        this._server.close((error: Error) => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    private createRequestProcessor(): HttpRequestProcessor {
        return new HttpRequestProcessor(
            this._configuration.requestHandler,
            this._configuration.errorHandler
        );
    }


    private createServer(): http.Server | https.Server {
        if (this.configuration.useSSL) {
            return this.createHttpsServer();
        } else {
            return this.createHttpServer();
        }
    }


    private createHttpServer(): http.Server {
        let server = http.createServer(this.onRequest);

        server.keepAliveTimeout = this.configuration.keepAliveTimeout;
        server.timeout = this.configuration.requestTimeout;
        server.maxHeadersCount = this.configuration.maxHeadersCount;

        return server;
    }


    private createHttpsServer(): https.Server {
        let server = https.createServer({
            // Secure options
        }, this.onRequest);

        server.keepAliveTimeout = this.configuration.keepAliveTimeout;
        server.timeout = this.configuration.requestTimeout;

        return server;
    }


    @Delegate
    private onRequest(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
        return this._requestProcessor.process(req, res);
    }
}
