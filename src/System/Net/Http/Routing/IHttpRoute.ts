import {IDictionary} from '../../../../Core/Collections/IDictionary';
import {IHttpRequestHandler} from '../IHttpRequestHandler';
import HttpRequest from '../HttpRequest';
import {IHttpRouteData} from './IHttpRouteData';
import {IHttpRouteConstraint} from './IHttpRouteConstraint';
import {IEnumerable} from '../../../../Core/Collections/IEnumerable';

/**
 * IHttpRoute defines the interface for a route expressing how to map
 * an incoming HttpRequest to a particular controller and action.
 */
export interface IHttpRoute {
    /**
     * Gets the constraints for the route parameters.
     */
    readonly constraints: IEnumerable<IHttpRouteConstraint>;

    /**
     * Gets any additional data tokens not used directly to determine
     * whether a route matches an incoming HttpRequest.
     */
    readonly additionalValues: IDictionary<string, any>;

    /**
     * Gets the default values for route parameters if not provided by the incoming HttpRequest.
     */
    readonly defaultValues: IDictionary<string, any>;

    /**
     * Gets the message handler that will be the recipient of the request.
     */
    readonly handler: IHttpRequestHandler;

    /**
     * Gets the route template describing the URI pattern to match against.
     */
    readonly routeTemplate: string;

    /**
     * Determine whether this route is a match for the incoming request by looking up the IHttpRouteData for the route.
     * Returns route data for a route if matches; otherwise null.
     */
    getRouteData(request: HttpRequest): IHttpRouteData;
}
