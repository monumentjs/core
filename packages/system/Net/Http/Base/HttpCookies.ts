import {ListSet} from '../../../../collections/main/ListSet';
import {HttpResponseCookie} from './HttpResponseCookie';


export class HttpCookies extends ListSet<HttpResponseCookie> {

    public constructor(cookies?: Iterable<HttpResponseCookie>) {
        super(cookies);
    }
}
