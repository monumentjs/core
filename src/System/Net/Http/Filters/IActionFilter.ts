import {HttpRequest} from '../HttpRequest';
import {AsyncResult} from '../../../../Core/types';
import {IFilter} from './IFilter';


/**
 * Defines the methods that are used in an action filter.
 */
export interface IActionFilter extends IFilter {
    executeActionFilter(request: HttpRequest): AsyncResult<boolean>;
}
