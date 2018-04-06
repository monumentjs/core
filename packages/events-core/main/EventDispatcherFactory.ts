import {Disposable} from '@monument/core/main/Disposable';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {EventArgs} from './EventArgs';
import {EventDispatcher} from './EventDispatcher';


export class EventDispatcherFactory implements Disposable {
    private readonly _events: ArrayList<EventDispatcher<EventArgs>> = new ArrayList();
    private readonly _target: object;


    public constructor(target: object) {
        this._target = target;
    }


    public create<TArgs extends EventArgs>(): EventDispatcher<TArgs> {
        const source: EventDispatcher<TArgs> = new EventDispatcher(this._target);

        this._events.add(source);

        return source;
    }


    public dispose(): void {
        this._events.clear();
    }
}
