import {EventArgs} from './EventArgs';
import {EventSource} from './EventSource';
import {IDisposable} from '../Core/Abstraction/IDisposable';


export class EventBinding<TTarget extends object, TArgs extends EventArgs> extends EventSource<TTarget, TArgs> implements IDisposable {
    protected _target: TTarget;


    public constructor(target: TTarget) {
        super();

        this._target = target;
    }


    public dispatch(event: TArgs): void {
        for (let {value} of this._handlers) {
            value.handler(this._target, event);

            if (event.isCancelled) {
                break;
            }
        }
    }


    public dispose(): void {
        for (let {value} of this._handlers) {
            value.dispose();
        }
    }
}
