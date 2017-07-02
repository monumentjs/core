import {IHttpRequestHandler} from '../IHttpRequestHandler';
import {IHttpRouteData} from './IHttpRouteData';
import {Assert} from '../../../../Core/Assertion/Assert';
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
        Assert.argument('routes', routes).notNull();
        Assert.argument('defaultHandler', defaultHandler).notNull();

        this._routes = routes;
        this._defaultHandler = defaultHandler;
    }


    public send(request: HttpRequest): Promise<HttpResponse> {
        let routeData: IHttpRouteData = this._routes.getRouteData(request);

        if (routeData == null) {
            return this._defaultHandler.send(request);
        }

        return routeData.route.handler.send(request);
    }
}
