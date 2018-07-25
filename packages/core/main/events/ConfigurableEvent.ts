import {Disposable} from '../Disposable';
import {ListSet} from '../collection/ListSet';
import {EventHandler} from './EventHandler';
import {Event} from './Event';
import {EventArgs} from './EventArgs';


export class ConfigurableEvent<TTarget extends object, TArgs extends EventArgs> implements Event<TTarget, TArgs>, Disposable {
    private readonly _handlers: ListSet<EventHandler<TTarget, TArgs>> = new ListSet();

    public subscribe(handler: EventHandler<TTarget, TArgs>): boolean {
        return this._handlers.add(handler);
    }


    public unsubscribe(handler: EventHandler<TTarget, TArgs>): boolean {
        return this._handlers.remove(handler);
    }


    public trigger(target: TTarget, args: TArgs): void {
        for (const handler of this._handlers) {
            handler(target, args);
        }
    }


    public dispose(): void {
        this._handlers.clear();
    }
}
