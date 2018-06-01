import {HttpErrorHandler} from './HttpErrorHandler';
import {StatusCode} from './StatusCode';
import {TextContent} from '../Content/TextContent';
import {HttpRequestContext} from '../Server/HttpRequestContext';


export class DefaultHttpErrorHandler implements HttpErrorHandler {
    public async process(context: HttpRequestContext, error: Error): Promise<void> {
        context.response.statusCode = StatusCode.InternalServerError;

        if (error) {
            context.response.content = new TextContent(error.toString());
        }
    }
}
