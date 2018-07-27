import {ReadOnlyList} from 'packages/core/main/collection/ReadOnlyList';
import {HttpResponseFilter} from '../HttpResponseFilter';


export interface HttpResponseFilterRegistry {
    readonly responseFilters: ReadOnlyList<HttpResponseFilter>;

    addResponseFilter(filter: HttpResponseFilter): void;
}
