import {Collection} from '../../../../Core/Collections/Collection';
import {IHttpRoute} from './IHttpRoute';
import {HttpRequest} from '../HttpRequest';
import {IHttpRouteData} from './IHttpRouteData';


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
