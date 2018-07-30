import {ReadOnlyList} from '@monument/core/main/collection/readonly/ReadOnlyList';
import {HttpResponseFilter} from '../HttpResponseFilter';


export interface HttpResponseFilterRegistry {
    readonly responseFilters: ReadOnlyList<HttpResponseFilter>;

    addResponseFilter(filter: HttpResponseFilter): void;
}
