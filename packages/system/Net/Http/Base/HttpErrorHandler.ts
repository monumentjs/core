import {HttpRequestContext} from '../Server/HttpRequestContext';


export interface HttpErrorHandler {
    process(request: HttpRequestContext, error: Error): Promise<void>;
}
