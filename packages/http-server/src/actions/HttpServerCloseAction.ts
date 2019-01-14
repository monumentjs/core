import {Action} from '@monument/reactive';
import {HttpServerActionType} from './HttpServerActionType';

export class HttpServerCloseAction implements Action {
    public readonly type = HttpServerActionType.CLOSE;
}
