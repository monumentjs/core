import {HttpRequest} from './HttpRequest';
import {HttpResponse} from './HttpResponse';


export interface IHttpErrorHandler {
    send(request: HttpRequest, error: Error): Promise<HttpResponse>;
}
