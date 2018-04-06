import {IHttpRoute} from './IHttpRoute';
import {IHttpRouteData} from './IHttpRouteData';
import {HttpRequest} from '../Base/HttpRequest';
import {Collection} from '../../../../collections/main/Collection';


export class HttpRoutesCollection extends Collection<IHttpRoute> {
    public getRouteData(request: HttpRequest): IHttpRouteData | undefined {
        for (let route of this) {
            let routeData = route.getRouteData(request);

            if (routeData != null) {
                return routeData;
            }
        }

        return undefined;
    }
}
