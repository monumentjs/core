import {IHttpRouteData} from './IHttpRouteData';
import {HttpRouteValueDictionary} from './HttpRouteValueDictionary';
import {IHttpRoute} from './IHttpRoute';


export class HttpRouteData implements IHttpRouteData {
    private _route: IHttpRoute;
    private _values: HttpRouteValueDictionary;


    public get route(): IHttpRoute {
        return this._route;
    }


    public get values(): HttpRouteValueDictionary {
        return this._values;
    }


    public constructor(route: IHttpRoute, values: HttpRouteValueDictionary) {
        this._route = route;
        this._values = values;
    }
}
