import {Collection} from '../Collections/Collection';
import {EventBinding} from './EventBinding';
import {EventArgs} from './EventArgs';
import {IDisposable} from '../Core/Abstraction/IDisposable';


export class EventBindings<TTarget extends object> implements IDisposable {
    private _bindings: Collection<EventBinding<TTarget, EventArgs>> = new Collection();
    private _target: TTarget;


    public constructor(target: TTarget) {
        this._target = target;
    }


    public create<TArgs extends EventArgs>(): EventBinding<TTarget, TArgs> {
        const source = new EventBinding<TTarget, TArgs>(this._target);

        this._bindings.add(source);

        return source;
    }


    public dispose(): void {
        this._bindings.clear();
    }
}
