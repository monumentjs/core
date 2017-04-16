import {IDictionary} from '../../../../Core/Collections/IDictionary';
import {IHttpRoute} from './IHttpRoute';


export interface IHttpRouteData {
    /**
     * Gets the object that represents the route.
     */
    readonly route: IHttpRoute;

    /**
     * Gets a collection of URL parameter values and default values for the route.
     */
    readonly values: IDictionary<string, object>;

    // /**
    //  * If a route is really a union of other routes, return the set of sub routes.
    //  */
    // getSubRoutes(): IEnumerable<IHttpRouteData>;

    // /**
    //  * Removes all optional parameters that do not have a value from the route data.
    //  */
    // removeOptionalRoutingParameters(): void;
}

