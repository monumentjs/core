import {Lifecycle} from '@monument/core/main/lifecycle/Lifecycle';
import {HttpRequestFilterRegistry} from '../request/filter/registry/HttpRequestFilterRegistry';
import {HttpResponseFilterRegistry} from '../response/filter/registry/HttpResponseFilterRegistry';
import {HttpRequest} from '../request/HttpRequest';
import {HttpResponse} from '../response/HttpResponse';


export interface HttpServer extends Lifecycle, HttpRequestFilterRegistry, HttpResponseFilterRegistry {
    serve(request: HttpRequest, response: HttpResponse): Promise<void>;
}
