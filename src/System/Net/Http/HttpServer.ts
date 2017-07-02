import {createServer as createHttpServer, IncomingMessage, Server as NativeHttpServer, ServerResponse} from 'http';
import {HttpServerConfiguration} from './HttpServerConfiguration';
import {HttpRequestReader} from './HttpRequestReader';
import {HttpResponse} from './HttpResponse';
import {Assert} from '../../../Core/Assertion/Assert';
import {HttpResponseWriter} from './HttpResponseWriter';
import {HttpRequest} from './HttpRequest';
import {DeferredObject} from '../../../Core/Async/DeferredObject';
import {Method} from '../../../Core/Language/Decorators/Method';


export class HttpServer {
    private _configuration: HttpServerConfiguration;
    private _server: NativeHttpServer;


    public get configuration(): HttpServerConfiguration {
        return this._configuration;
    }


    public get isListening(): boolean {
        return this._server.listening;
    }


    public constructor(serverConfiguration: HttpServerConfiguration) {
        Assert.argument('serverConfiguration', serverConfiguration).notNull();

        let {maxHeadersCount, keepAliveTimeout, requestTimeout} = serverConfiguration;

        this._configuration = serverConfiguration;

        this._server = createHttpServer(this.onRequest);
        this._server.maxHeadersCount = maxHeadersCount;
        // TODO: remove type casting after NodeJS typings will be
        (this._server as any).keepAliveTimeout = keepAliveTimeout;
        this._server.timeout = requestTimeout;
    }


    public listen(): Promise<void> {
        let deferred: DeferredObject<void> = new DeferredObject<void>();
        let {host, port, backlogSize} = this.configuration;

        this._server.listen(port, host, backlogSize, (error: NodeJS.ErrnoException) => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public stop(): Promise<void> {
        let deferred: DeferredObject<void> = new DeferredObject<void>();

        this._server.close((error: NodeJS.ErrnoException) => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    @Method.attached()
    protected async onRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
        let requestReader: HttpRequestReader = new HttpRequestReader(req);
        let responseWriter: HttpResponseWriter = new HttpResponseWriter(res);
        let response: HttpResponse = await this.getResponse(requestReader.request);

        await responseWriter.send(response);
    }


    protected async getResponse(request: HttpRequest): Promise<HttpResponse> {
        try {
            return await this._configuration.requestHandler.send(request);
        } catch (ex) {
            return await this._configuration.errorHandler.send(request, ex);
        }
    }
}
