import {Type} from '@monument/core/main/Type';
import {ActionHandlerFunction} from './ActionHandlerFunction';


export class ActionHandler<T extends object> {
    private _type: Type<T>;
    private _callback: ActionHandlerFunction<T>;


    public get type(): Type<T> {
        return this._type;
    }


    public get callback(): ActionHandlerFunction<T> {
        return this._callback;
    }


    public constructor(type: Type<T>, callback: ActionHandlerFunction<T>) {
        this._type = type;
        this._callback = callback;
    }


    public handle(action: T): boolean {
        if (action instanceof this.type) {
            this.callback(action);

            return true;
        }

        return false;
    }
}
