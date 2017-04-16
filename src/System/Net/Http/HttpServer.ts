import {createServer as createHttpServer, IncomingMessage, Server as NativeHttpServer, ServerResponse} from 'http';
import {AsyncResult} from '../../../Core/types';
import HttpServerStartInfo from './HttpServerStartInfo';
import HttpRequest from './HttpRequest';
import HttpResponse from './HttpResponse';
import {callAsyncMethod} from '../../../Core/Async/Utils';
import {assertArgumentNotNull} from '../../../Core/Assertion/Assert';
import InvalidOperationException from '../../../Core/Exceptions/InvalidOperationException';
import IHttpRequestHandler from './HttpRoutingDispatcher';
import {StatusCode} from './StatusCode';
import TextContent from './TextContent';
import HttpResponseWriter from './HttpResponseWriter';


type RequestListener = (request: IncomingMessage, response: ServerResponse) => void;


export default class HttpServer {
    private _requestListener: RequestListener;
    private _requestHandler: IHttpRequestHandler;
    private _server: NativeHttpServer;


    public get isListening(): boolean {
        return this._server.listening;
    }


    public get maxHeadersCount(): number {
        return this._server.maxHeadersCount;
    }


    public set maxHeadersCount(value: number) {
        assertArgumentNotNull('value', value);

        this._server.maxHeadersCount = value;
    }


    public get requestTimeout(): number {
        return this._server.timeout;
    }


    public set requestTimeout(value: number) {
        assertArgumentNotNull('value', value);

        this._server.timeout = value;
    }


    public get port(): number {
        if (!this.isListening) {
            throw new InvalidOperationException(`Cannot read address of server that is not started.`);
        }

        return this._server.address().port;
    }


    public get address(): string {
        if (!this.isListening) {
            throw new InvalidOperationException(`Cannot read address of server that is not started.`);
        }

        return this._server.address().address;
    }


    public get family(): string {
        if (!this.isListening) {
            throw new InvalidOperationException(`Cannot read address of server that is not started.`);
        }

        return this._server.address().family;
    }


    public constructor(requestHandler: IHttpRequestHandler) {
        assertArgumentNotNull('requestHandler', requestHandler);

        this._requestHandler = requestHandler;

        this.createRequestListener();
        this.createInternalServer();
    }


    public startListen(startInfo: HttpServerStartInfo): AsyncResult<void> {
        assertArgumentNotNull('startInfo', startInfo);

        return callAsyncMethod<void>(this._server, 'listen', startInfo.port, startInfo.host, startInfo.backlogSize);
    }


    public stopListen(): AsyncResult<void> {
        return callAsyncMethod<void>(this._server, 'close');
    }


    protected createRequestListener(): void {
        this._requestListener = async (req: IncomingMessage, res: ServerResponse): AsyncResult<void> => {
            let request: HttpRequest = new HttpRequest(req);
            let response: HttpResponse = await this.getResponse(request);
            let responseWriter: HttpResponseWriter = new HttpResponseWriter(res);

            await responseWriter.send(response);
        };
    }


    protected createInternalServer(): void {
        this._server = createHttpServer(this._requestListener);
    }


    protected async getResponse(request: HttpRequest): AsyncResult<HttpResponse> {
        try {
            return await this._requestHandler.send(request);
        } catch (ex) {
            return this.createErrorResponse(ex);
        }
    }


    private createErrorResponse(error?: Error): HttpResponse {
        let errorResponse: HttpResponse = new HttpResponse(StatusCode.InternalServerError);

        if (error) {
            errorResponse.content = new TextContent(error.toString());
        }

        return errorResponse;
    }
}
