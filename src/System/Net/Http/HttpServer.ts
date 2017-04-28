import {createServer as createHttpServer, IncomingMessage, Server as NativeHttpServer, ServerResponse} from 'http';
import {AsyncResult} from '../../../Core/types';
import {HttpServerConfiguration} from './HttpServerConfiguration';
import {HttpRequest} from './HttpRequest';
import {HttpResponse} from './HttpResponse';
import {callAsyncMethod} from '../../../Core/Async/Utils';
import {assertArgumentNotNull} from '../../../Core/Assertion/Assert';
import {StatusCode} from './StatusCode';
import {TextContent} from './Content/TextContent';
import {HttpResponseWriter} from './HttpResponseWriter';
import {IHttpRequestHandler} from './IHttpRequestHandler';


type RequestListener = (request: IncomingMessage, response: ServerResponse) => void;


export class HttpServer {
    private _requestListener: RequestListener;
    private _requestHandler: IHttpRequestHandler;
    private _serverConfiguration: HttpServerConfiguration;
    private _server: NativeHttpServer;


    public get serverConfiguration(): HttpServerConfiguration {
        return this._serverConfiguration;
    }


    public get isListening(): boolean {
        return this._server.listening;
    }


    public get requestTimeout(): number {
        return this._server.timeout;
    }


    public set requestTimeout(value: number) {
        assertArgumentNotNull('value', value);

        this._server.timeout = value;
    }


    public constructor(serverConfiguration: HttpServerConfiguration, requestHandler: IHttpRequestHandler) {
        assertArgumentNotNull('serverConfiguration', serverConfiguration);
        assertArgumentNotNull('requestHandler', requestHandler);

        this._serverConfiguration = serverConfiguration;
        this._requestHandler = requestHandler;

        this.createRequestListener();
        this.createInternalServer();
    }


    public listen(): AsyncResult {
        return callAsyncMethod<void>(
            this._server,
            'listen',
            this.serverConfiguration.port,
            this.serverConfiguration.host,
            this.serverConfiguration.backlogSize
        );
    }


    public stop(): AsyncResult {
        return callAsyncMethod<void>(this._server, 'close');
    }


    protected createRequestListener(): void {
        this._requestListener = async (req: IncomingMessage, res: ServerResponse): AsyncResult => {
            let request: HttpRequest = new HttpRequest(req);
            let response: HttpResponse = await this.getResponse(request);
            let responseWriter: HttpResponseWriter = new HttpResponseWriter(res);

            await responseWriter.send(response);
        };
    }


    protected createInternalServer(): void {
        this._server = createHttpServer(this._requestListener);
        this._server.maxHeadersCount = this.serverConfiguration.maxHeadersCount;
        this._server.timeout = this.serverConfiguration.requestTimeout;
    }


    protected async getResponse(request: HttpRequest): AsyncResult<HttpResponse> {
        try {
            return await this._requestHandler.send(request);
        } catch (ex) {
            return this.createErrorResponse(ex);
        }
    }


    protected createErrorResponse(error?: Error): HttpResponse {
        let errorResponse: HttpResponse = new HttpResponse(StatusCode.InternalServerError);

        if (error) {
            errorResponse.content = new TextContent(error.toString());
        }

        return errorResponse;
    }
}
