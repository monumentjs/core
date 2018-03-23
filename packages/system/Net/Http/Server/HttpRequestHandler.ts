import {HttpRequestContext} from './HttpRequestContext';


export interface HttpRequestHandler {
    process(request: HttpRequestContext): Promise<void>;
}
