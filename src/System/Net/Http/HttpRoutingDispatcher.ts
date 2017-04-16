import HttpRequest from './HttpRequest';
import HttpResponse from './HttpResponse';
import {AsyncResult} from '../../../Core/types';
import {IHttpRequestHandler} from './IHttpRequestHandler';
import {IHttpRouteData} from './Routing/IHttpRouteData';
import HttpConfiguration from './HttpConfiguration';
import HttpRouteCollection from './Routing/HttpRouteCollection';


export default class HttpRoutingDispatcher implements IHttpRequestHandler {
    private _configuration: HttpConfiguration;
    private _defaultHandler: IHttpRequestHandler;


    public constructor(configuration: HttpConfiguration, defaultHandler: IHttpRequestHandler) {
        this._configuration = configuration;
        this._defaultHandler = defaultHandler;
    }


    public send(request: HttpRequest): AsyncResult<HttpResponse> {
        let routes: HttpRouteCollection = this._configuration.routes;
        let routeData: IHttpRouteData = routes.getRouteData(request);

        if (routeData == null) {
            return this._defaultHandler.send(request);
        }

        return routeData.route.handler.send(request);
    }
}