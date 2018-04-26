import {Disposable} from '@monument/core/main/Disposable';
import {ListSet} from '@monument/collections/main/ListSet';
import {EventHandler} from './EventHandler';
import {Event} from './Event';


export class ConfigurableEvent<TTarget extends object, TArgs> implements Event<TTarget, TArgs>, Disposable {
    private readonly _handlers: ListSet<EventHandler<TTarget, TArgs>> = new ListSet();
    private readonly _target: TTarget;


    public constructor(target: TTarget) {
        this._target = target;
    }


    public subscribe(handler: EventHandler<TTarget, TArgs>): boolean {
        return this._handlers.add(handler);
    }


    public unsubscribe(handler: EventHandler<TTarget, TArgs>): boolean {
        return this._handlers.remove(handler);
    }


    public dispatch(args: TArgs): void {
        for (let handler of this._handlers) {
            handler(this._target, args);
        }
    }


    public dispose(): void {
        this._handlers.clear();
    }
}
