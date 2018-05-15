import {IHttpRoute} from './IHttpRoute';
import {Map} from '@monument/core/Collections/Abstraction/Map';


export interface IHttpRouteData {
    /**
     * Gets the reflection that represents the route.
     */
    readonly route: IHttpRoute;

    /**
     * Gets a collection of URL parameter values and default values for the route.
     */
    readonly values: Map<string, object>;

    // /**
    //  * If a route is really a union of other routes, return the set of sub routes.
    //  */
    // getSubRoutes(): Enumerable<IHttpRouteData>;

    // /**
    //  * Removes all optional parameters that do not have a payload from the route data.
    //  */
    // removeOptionalRoutingParameters(): void;
}

