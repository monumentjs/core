import {ReadOnlyList} from 'packages/core/main/collection/ReadOnlyList';
import {HttpRequestFilter} from '../HttpRequestFilter';


export interface HttpRequestFilterRegistry {
    readonly requestFilters: ReadOnlyList<HttpRequestFilter>;

    addRequestFilter(filter: HttpRequestFilter): void;
}
