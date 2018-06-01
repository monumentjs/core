import {HttpRequestHandler} from '../Server/HttpRequestHandler';
import {IHttpRouteData} from './IHttpRouteData';
import {HttpRoutesCollection} from './HttpRoutesCollection';
import {HttpRequest} from '../Base/HttpRequest';
import {HttpResponse} from '../Base/HttpResponse';


export class HttpRoutingDispatcher implements HttpRequestHandler {
    private _routes: HttpRoutesCollection;
    private _defaultHandler: HttpRequestHandler;


    public get routes(): HttpRoutesCollection {
        return this._routes;
    }


    public get defaultHandler(): HttpRequestHandler {
        return this._defaultHandler;
    }


    public constructor(routes: HttpRoutesCollection, defaultHandler: HttpRequestHandler) {
        this._routes = routes;
        this._defaultHandler = defaultHandler;
    }


    public process(request: HttpRequest): Promise<HttpResponse> {
        let routeData: IHttpRouteData | undefined = this.routes.getRouteData(request);

        if (routeData == null) {
            return this.defaultHandler.process(request);
        }

        return routeData.route.handler.process(request);
    }
}
