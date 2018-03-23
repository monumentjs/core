import {IncomingMessage, ServerResponse} from 'http';
import {HttpResponseOutputStream} from './HttpResponseOutputStream';
import {HttpResponse} from '../Base/HttpResponse';
import {HttpRequestContext} from './HttpRequestContext';
import {HttpRequestHandler} from './HttpRequestHandler';
import {HttpErrorHandler} from '../Base/HttpErrorHandler';


export class HttpRequestProcessor {
    private _requestHandler: HttpRequestHandler;
    private _errorHandler: HttpErrorHandler;


    public constructor(requestHandler: HttpRequestHandler, errorHandler: HttpErrorHandler) {
        this._requestHandler = requestHandler;
        this._errorHandler = errorHandler;
    }


    public async process(req: IncomingMessage, res: ServerResponse): Promise<void> {
        let context: HttpRequestContext = new HttpRequestContext(req, res);

        await this.getResponse(context);

        await this.sendResponse(context.response, context.responseStream);
    }


    private async getResponse(context: HttpRequestContext): Promise<void> {
        try {
            await this._requestHandler.process(context);
        } catch (ex) {
            await this._errorHandler.process(context, ex);
        }
    }


    private async sendResponse(response: HttpResponse, stream: HttpResponseOutputStream): Promise<void> {
        stream.setStatusCode(response.statusCode);
        stream.setStatusMessage(response.statusMessage);
        stream.setHeaders(response.headers);

        if (response.content) {
            stream.setHeaders(response.content.headers);

            await response.content.copyTo(stream);
        }

        await stream.close();
    }
}
