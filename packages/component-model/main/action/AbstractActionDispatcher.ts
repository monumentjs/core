import {Type} from '@monument/core/main/Type';
import {Set} from '@monument/collections-core/main/Set';
import {ListSet} from '@monument/collections/main/ListSet';
import {Disposable} from '@monument/core/main/Disposable';
import {ActionDispatcher} from './ActionDispatcher';
import {ActionHandler} from './ActionHandler';
import {ActionHandlerFunction} from './ActionHandlerFunction';
import {ActionHandlerEqualityComparator} from './ActionHandlerEqualityComparator';


export abstract class AbstractActionDispatcher implements Disposable, ActionDispatcher {
    private _handlers: Set<ActionHandler<object>> = new ListSet(undefined, ActionHandlerEqualityComparator.instance);


    public dispatchAction<T extends object>(action: T): void {
        for (let handler of this._handlers) {
            handler.handle(action);
        }
    }


    public addActionHandler<T extends object>(type: Type<T>, callback: ActionHandlerFunction<T>): boolean {
        return this._handlers.add(new ActionHandler(type, callback));
    }


    public removeActionHandler<T extends object>(type: Type<T>, callback: ActionHandlerFunction<T>): boolean {
        return this._handlers.remove(new ActionHandler(type, callback));
    }


    public hasActionHandler<T extends object>(type: Type<T>, callback: ActionHandlerFunction<T>): boolean {
        return this._handlers.contains(new ActionHandler(type, callback));
    }


    public dispose(): void {
        this._handlers.clear();
    }
}
