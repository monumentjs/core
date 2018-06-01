import {HttpRoutesCollection} from './HttpRoutesCollection';
import {IHttpRoute} from './IHttpRoute';


export class HttpRoutesRegistry {
    public static get routes(): HttpRoutesCollection {
        if (this._routes == null) {
            this._routes = new HttpRoutesCollection();
        }

        return this._routes;
    }


    public static add(route: IHttpRoute): void {
        this.routes.add(route);
    }


    private static _routes: HttpRoutesCollection;
}
