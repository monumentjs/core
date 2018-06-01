import {HttpRequestInputStream} from '../Server/HttpRequestInputStream';
import {IHttpRoute} from './IHttpRoute';
import {HttpRouteValueDictionary} from './HttpRouteValueDictionary';


export interface IHttpRouteConstraint {
    /**
     * Determines whether the URL parameter contains a valid payload for this constraint.
     */
    match(
        request: HttpRequestInputStream,
        route: IHttpRoute,
        parameterName: string,
        values: HttpRouteValueDictionary
    ): boolean;
}
