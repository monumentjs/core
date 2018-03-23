import {HttpResponse} from './HttpResponse';


export interface HttpResponsePostProcessor {
    transform(response: HttpResponse): Promise<HttpResponse>;
}
