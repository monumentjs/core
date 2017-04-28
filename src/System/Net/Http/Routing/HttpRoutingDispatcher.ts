import {AsyncResult} from '../../../../Core/types';
import {IHttpRequestHandler} from '../IHttpRequestHandler';
import {IHttpRouteData} from './IHttpRouteData';
import {assertArgumentNotNull} from '../../../../Core/Assertion/Assert';
import {HttpRoutesCollection} from './HttpRoutesCollection';
import {HttpRequest} from '../HttpRequest';
import {HttpResponse} from '../HttpResponse';


export class HttpRoutingDispatcher implements IHttpRequestHandler {
    private _routes: HttpRoutesCollection = new HttpRoutesCollection();
    private _defaultHandler: IHttpRequestHandler;


    public get routes(): HttpRoutesCollection {
        return this._routes;
    }


    public get defaultHandler(): IHttpRequestHandler {
        return this._defaultHandler;
    }


    public constructor(routes: HttpRoutesCollection, defaultHandler: IHttpRequestHandler) {
        assertArgumentNotNull('routes', routes);
        assertArgumentNotNull('defaultHandler', defaultHandler);

        this._routes = routes;
        this._defaultHandler = defaultHandler;
    }


    public send(request: HttpRequest): AsyncResult<HttpResponse> {
        let routeData: IHttpRouteData = this._routes.getRouteData(request);

        if (routeData == null) {
            return this._defaultHandler.send(request);
        }

        return routeData.route.handler.send(request);
    }
}
