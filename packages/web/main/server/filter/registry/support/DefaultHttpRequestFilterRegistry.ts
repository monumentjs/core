import {ReadOnlyList} from '@monument/core/main/collection/readonly/ReadOnlyList';
import {HttpRequestFilterRegistry} from '../HttpRequestFilterRegistry';
import {HttpRequestFilter} from '../../HttpRequestFilter';
import {PrioritizedList} from '@monument/core/main/collection/specialized/PrioritizedList';


export class DefaultHttpRequestFilterRegistry implements HttpRequestFilterRegistry {
    private readonly _requestFilters: PrioritizedList<HttpRequestFilter> = new PrioritizedList();

    public get requestFilters(): ReadOnlyList<HttpRequestFilter> {
        return this._requestFilters;
    }

    public addRequestFilter(filter: HttpRequestFilter): void {
        this._requestFilters.add(filter);
    }
}
