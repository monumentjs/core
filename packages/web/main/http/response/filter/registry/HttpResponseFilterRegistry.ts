import {ReadOnlyList} from '../../../../../../core/main/collections/ReadOnlyList';
import {HttpResponseFilter} from '../HttpResponseFilter';


export interface HttpResponseFilterRegistry {
    readonly responseFilters: ReadOnlyList<HttpResponseFilter>;

    addRequestFilter(filter: HttpResponseFilter): void;
    addRequestFilter(filter: HttpResponseFilter, priority: number): void;
}
