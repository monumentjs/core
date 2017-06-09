import {HttpRequestReader} from '../HttpRequestReader';
import {IFilter} from './IFilter';


/**
 * Defines the methods that are used in an action filter.
 */
export interface IActionFilter extends IFilter {
    executeActionFilter(request: HttpRequestReader): Promise<boolean>;
}
