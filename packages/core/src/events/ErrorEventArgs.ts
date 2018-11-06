import {EventArgs} from './EventArgs';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ErrorEventArgs<TTarget extends object = object> extends EventArgs<TTarget> {
    public readonly error: Error;

    public constructor(target: TTarget, error: Error) {
        super(target);
        this.error = error;
    }
}
