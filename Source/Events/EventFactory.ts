import {Collection} from '../Collections/Collection';
import {Event} from './Event';
import {EventArgs} from './EventArgs';
import {IDisposable} from '../Core/Abstraction/IDisposable';


export class EventFactory<TTarget extends object> implements IDisposable {
    private _events: Collection<Event<TTarget, EventArgs>> = new Collection();
    private _target: TTarget;


    public constructor(target: TTarget) {
        this._target = target;
    }


    public create<TArgs extends EventArgs>(): Event<TTarget, TArgs> {
        const source = new Event<TTarget, TArgs>(this._target);

        this._events.add(source);

        return source;
    }


    public dispose(): void {
        this._events.clear();
    }
}
