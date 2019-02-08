import { Action } from '@monument/reactive';
import { HttpRequest } from '../HttpRequest';
import { HttpResponse } from '../HttpResponse';
import { HttpServerActionType } from './HttpServerActionType';

export class HttpServerRequestAction implements Action {
    public readonly type = HttpServerActionType.REQUEST;
    public readonly request: HttpRequest;
    public readonly response: HttpResponse;

    public constructor(request: HttpRequest, response: HttpResponse) {
        this.request = request;
        this.response = response;
    }
}
