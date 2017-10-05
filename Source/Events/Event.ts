import {EventArgs} from './EventArgs';
import {EventHandler} from './EventHandler';
import {IDisposable} from '../Core/Abstraction/IDisposable';


export class Event<TTarget extends object = object, TArgs extends EventArgs = EventArgs> extends EventHandler<TTarget, TArgs> implements IDisposable {
    protected _target: TTarget;


    public constructor(target: TTarget) {
        super();

        this._target = target;
    }


    public dispatch(args: TArgs): void {
        for (let {value} of this._subscriptions) {
            value.handler(this._target, args);

            if (args.isCancelled) {
                break;
            }
        }
    }


    public dispose(): void {
        for (let {value} of this._subscriptions) {
            value.dispose();
        }
    }
}
