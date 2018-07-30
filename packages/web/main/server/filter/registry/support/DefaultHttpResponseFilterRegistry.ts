import {HttpResponseFilterRegistry} from '../HttpResponseFilterRegistry';
import {HttpResponseFilter} from '../../HttpResponseFilter';
import {PrioritizedList} from '@monument/core/main/collection/specialized/PrioritizedList';
import {ReadOnlyList} from '@monument/core/main/collection/readonly/ReadOnlyList';


export class DefaultHttpResponseFilterRegistry implements HttpResponseFilterRegistry {
    private readonly _responseFilters: PrioritizedList<HttpResponseFilter> = new PrioritizedList();

    public get responseFilters(): ReadOnlyList<HttpResponseFilter> {
        return this._responseFilters;
    }

    public addResponseFilter(filter: HttpResponseFilter): void {
        this._responseFilters.add(filter);
    }
}
