import {HttpRoutesCollection} from './HttpRoutesCollection';
import {IHttpRoute} from './IHttpRoute';
import {assertArgumentNotNull} from '../../../../Core/Assertion/Assert';


export class HttpRoutesRegistry {
    public static get routes(): HttpRoutesCollection {
        if (this._routes == null) {
            this._routes = new HttpRoutesCollection();
        }

        return this._routes;
    }


    public static registerRoute(route: IHttpRoute): void {
        assertArgumentNotNull('route', route);

        this.routes.add(route);
    }


    private static _routes: HttpRoutesCollection;
}
