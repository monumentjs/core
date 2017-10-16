import {Collection} from '../Collections/Collection';
import {EventDispatcher} from './EventDispatcher';
import {EventArgs} from './EventArgs';
import {IDisposable} from '../Core/Abstraction/IDisposable';


export class EventFactory<TTarget extends object> implements IDisposable {
    private _events: Collection<EventDispatcher<TTarget, EventArgs>> = new Collection();
    private _target: TTarget;


    public constructor(target: TTarget) {
        this._target = target;
    }


    public create<TArgs extends EventArgs>(): EventDispatcher<TTarget, TArgs> {
        const source = new EventDispatcher<TTarget, TArgs>(this._target);

        this._events.add(source);

        return source;
    }


    public dispose(): void {
        this._events.clear();
    }
}
