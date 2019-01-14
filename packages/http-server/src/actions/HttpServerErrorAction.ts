import {Action} from '@monument/reactive';
import {HttpServerActionType} from './HttpServerActionType';

export class HttpServerErrorAction implements Action {
    public readonly type = HttpServerActionType.ERROR;
    public readonly error: Error;

    public constructor(error: Error) {
        this.error = error;
    }
}
