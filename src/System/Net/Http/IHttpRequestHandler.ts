import {HttpRequest} from './HttpRequest';
import {HttpResponse} from './HttpResponse';


export interface IHttpRequestHandler {
    send(request: HttpRequest): Promise<HttpResponse>;
}
