import {Collection} from '../../../../Core/Collections/Collection';
import {IHttpRoute} from './IHttpRoute';
import {IHttpRouteData} from './IHttpRouteData';
import {HttpRequest} from '../HttpRequest';


export class HttpRoutesCollection extends Collection<IHttpRoute> {
    public getRouteData(request: HttpRequest): IHttpRouteData {
        for (let route of this) {
            let routeData = route.getRouteData(request);

            if (routeData != null) {
                return routeData;
            }
        }

        return null;
    }
}
