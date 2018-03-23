import {Type} from '@monument/core/main/Type';
import {ActionHandlerFunction} from './ActionHandlerFunction';


export interface ActionDispatcher {
    dispatchAction<T extends object>(action: T): void;
    addActionHandler<T extends object>(type: Type<T>, callback: ActionHandlerFunction<T>): boolean;
    removeActionHandler<T extends object>(type: Type<T>, callback: ActionHandlerFunction<T>): boolean;
    hasActionHandler<T extends object>(type: Type<T>, callback: ActionHandlerFunction<T>): boolean;
}