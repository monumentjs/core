import {ReadOnlyList} from '../../../../../../core/main/collections/ReadOnlyList';
import {HttpRequestFilter} from '../HttpRequestFilter';


export interface HttpRequestFilterRegistry {
    readonly requestFilters: ReadOnlyList<HttpRequestFilter>;

    addRequestFilter(filter: HttpRequestFilter): void;
    addRequestFilter(filter: HttpRequestFilter, priority: number): void;
}
