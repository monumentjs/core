import {Ordered} from '@monument/core/main/Ordered';
import {HttpResponse} from '@monument/node/main/http/server/response/HttpResponse';


export interface HttpResponseFilter extends Ordered {
    filter(response: HttpResponse): Promise<HttpResponse> | HttpResponse;
}
