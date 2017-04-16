import {AsyncResult} from '../../../Core/types';
import HttpRequest from './HttpRequest';
import HttpResponse from './HttpResponse';


export interface IHttpRequestHandler {
    send(request: HttpRequest): AsyncResult<HttpResponse>;
}
