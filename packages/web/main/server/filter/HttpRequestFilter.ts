import {HttpRequest} from '@monument/node/main/http/server/request/HttpRequest';
import {Ordered} from '@monument/core/main/Ordered';


export interface HttpRequestFilter extends Ordered {
    [HttpRequestFilter.filter](request: HttpRequest): Promise<HttpRequest> | HttpRequest;
}

export namespace HttpRequestFilter {
    export const filter = Symbol();
}
