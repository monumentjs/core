import {HttpResponse} from '../../../../../node/main/http/server/response/HttpResponse';
import {Ordered} from '@monument/core/main/Ordered';


export interface HttpResponseFilter extends Ordered {
    filter(response: HttpResponse): Promise<HttpResponse> | HttpResponse;
}
