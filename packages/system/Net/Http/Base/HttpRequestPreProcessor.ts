import {HttpRequest} from './HttpRequest';


export interface HttpRequestPreProcessor {
    transform(request: HttpRequest): Promise<HttpRequest>;
}
