import {Disposable} from '@monument/core/main/Disposable';
import {Collection} from '@monument/collections-core/main/Collection';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {EventArgs} from './EventArgs';
import {EventDispatcher} from './EventDispatcher';


export class EventDispatcherFactory<TTarget extends object> implements Disposable {
    private _events: Collection<EventDispatcher<TTarget, EventArgs>> = new ArrayList();
    private _target: TTarget;


    public constructor(target: TTarget) {
        this._target = target;
    }


    public create<TArgs extends EventArgs>(): EventDispatcher<TTarget, TArgs> {
        const source: EventDispatcher<TTarget, TArgs> = new EventDispatcher(this._target);

        this._events.add(source);

        return source;
    }


    public dispose(): void {
        this._events.clear();
    }
}
