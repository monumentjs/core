import {HttpRequest} from '../HttpRequest';
import {IHttpRoute} from './IHttpRoute';
import {HttpRouteValueDictionary} from './HttpRouteValueDictionary';


export interface IHttpRouteConstraint {
    /**
     * Determines whether the URL parameter contains a valid value for this constraint.
     */
    match(
        request: HttpRequest,
        route: IHttpRoute,
        parameterName: string,
        values: HttpRouteValueDictionary
    ): boolean;
}
