import {HttpRequest} from '../HttpRequest';


export interface HttpRequestFilter {
    filter(request: HttpRequest): Promise<HttpRequest> | HttpRequest;
}
