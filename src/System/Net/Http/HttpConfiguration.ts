import HttpRouteCollection from './Routing/HttpRouteCollection';


export default class HttpConfiguration {
    private _routes: HttpRouteCollection = new HttpRouteCollection();


    public get routes(): HttpRouteCollection {
        return this._routes;
    }


    public constructor(routes: HttpRouteCollection) {
        this._routes = routes;
    }
}
