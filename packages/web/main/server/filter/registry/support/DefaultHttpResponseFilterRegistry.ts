import {NumberComparator} from 'packages/core/main/utils/NumberComparator';
import {List} from 'packages/core/main/collection/List';
import {ReadOnlyList} from 'packages/core/main/collection/ReadOnlyList';
import {ArrayList} from 'packages/core/main/collection/ArrayList';
import {HttpResponseFilterRegistry} from '../HttpResponseFilterRegistry';
import {HttpResponseFilter} from '../../HttpResponseFilter';


export class DefaultHttpResponseFilterRegistry implements HttpResponseFilterRegistry {
    private readonly _numberComparator: NumberComparator = new NumberComparator();
    private readonly _responseFilters: List<HttpResponseFilter> = new ArrayList();

    public get responseFilters(): ReadOnlyList<HttpResponseFilter> {
        return this._responseFilters;
    }

    public addResponseFilter(filter: HttpResponseFilter): void {
        // TODO: use ordered list OrderedList : ListWrapper <- SimpleOrderedList = OrderedList<Ordered>
        this._responseFilters.add(filter);
        this._responseFilters = this._responseFilters.orderBy((item: HttpResponseFilter) => {
            return item.order;
        }, this._numberComparator);
    }
    
}
