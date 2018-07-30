import {ReadOnlyList} from '@monument/core/main/collection/readonly/ReadOnlyList';
import {HttpRequestFilter} from '../HttpRequestFilter';


export interface HttpRequestFilterRegistry {
    readonly requestFilters: ReadOnlyList<HttpRequestFilter>;

    addRequestFilter(filter: HttpRequestFilter): void;
}
