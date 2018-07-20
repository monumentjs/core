import {HttpResponse} from '../HttpResponse';


export interface HttpResponseFilter {
    filter(response: HttpResponse): Promise<HttpResponse> | HttpResponse;
}
