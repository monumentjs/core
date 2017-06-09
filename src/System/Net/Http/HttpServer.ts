import {createServer as createHttpServer, IncomingMessage, Server as NativeHttpServer, ServerResponse} from 'http';
import {AsyncResult} from '../../../Core/types';
import {HttpServerConfiguration} from './HttpServerConfiguration';
import {HttpRequestReader} from './HttpRequestReader';
import {HttpResponse} from './HttpResponse';
import {callAsyncMethod} from '../../../Core/Async/Utils';
import {assertArgumentNotNull} from '../../../Core/Assertion/Assert';
import {StatusCode} from './StatusCode';
import {TextContent} from './Content/TextContent';
import {HttpResponseWriter} from './HttpResponseWriter';
import {HttpRequest} from './HttpRequest';


type RequestListener = (request: IncomingMessage, response: ServerResponse) => void;


export class HttpServer {
    private _requestListener: RequestListener;
    private _configuration: HttpServerConfiguration;
    private _server: NativeHttpServer;


    public get configuration(): HttpServerConfiguration {
        return this._configuration;
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


    public constructor(serverConfiguration: HttpServerConfiguration) {
        assertArgumentNotNull('serverConfiguration', serverConfiguration);

        this._configuration = serverConfiguration;

        this.createRequestListener();
        this.createInternalServer();
    }


    public listen(): AsyncResult {
        return callAsyncMethod(
            this._server,
            'listen',
            this.configuration.port,
            this.configuration.host,
            this.configuration.backlogSize
        );
    }


    public stop(): AsyncResult {
        return callAsyncMethod(this._server, 'close');
    }


    protected createRequestListener(): void {
        this._requestListener = async (req: IncomingMessage, res: ServerResponse): AsyncResult => {
            let requestReader: HttpRequestReader = new HttpRequestReader(req);
            let responseWriter: HttpResponseWriter = new HttpResponseWriter(res);
            let response: HttpResponse = await this.getResponse(requestReader.request);

            await responseWriter.send(response);
        };
    }


    protected createInternalServer(): void {
        this._server = createHttpServer(this._requestListener);
        this._server.maxHeadersCount = this.configuration.maxHeadersCount;
        this._server.timeout = this.configuration.requestTimeout;
    }


    protected async getResponse(request: HttpRequest): AsyncResult<HttpResponse> {
        try {
            return await this._configuration.requestHandler.send(request);
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
