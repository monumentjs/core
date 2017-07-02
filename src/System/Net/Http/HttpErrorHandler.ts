import {IHttpErrorHandler} from './IHttpErrorHandler';
import {HttpRequest} from './HttpRequest';
import {HttpResponse} from './HttpResponse';
import {StatusCode} from './StatusCode';
import {TextContent} from './Content/TextContent';


export class HttpErrorHandler implements IHttpErrorHandler {
    public async send(request: HttpRequest, error: Error): Promise<HttpResponse> {
        let errorResponse: HttpResponse = new HttpResponse(StatusCode.InternalServerError);

        if (error) {
            errorResponse.content = new TextContent(error.toString());
        }

        return errorResponse;
    }
}
