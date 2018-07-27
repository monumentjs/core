import {NumberComparator} from 'packages/core/main/utils/NumberComparator';
import {List} from 'packages/core/main/collection/List';
import {ReadOnlyList} from 'packages/core/main/collection/ReadOnlyList';
import {ArrayList} from 'packages/core/main/collection/ArrayList';
import {HttpRequestFilterRegistry} from '../HttpRequestFilterRegistry';
import {HttpRequestFilter} from '../../HttpRequestFilter';


export class DefaultHttpRequestFilterRegistry implements HttpRequestFilterRegistry {
    private readonly _numberComparator: NumberComparator = new NumberComparator();
    private readonly _requestFilters: List<HttpRequestFilter> = new ArrayList();

    public get requestFilters(): ReadOnlyList<HttpRequestFilter> {
        return this._requestFilters;
    }

    public addRequestFilter(filter: HttpRequestFilter): void {
        // TODO: use ordered list OrderedList : ListWrapper <- SimpleOrderedList = OrderedList<Ordered>
        this._requestFilters.add(filter);
        this._requestFilters = this._requestFilters.orderBy((item: HttpRequestFilter) => {
            return item.order;
        }, this._numberComparator);
    }
    
}
