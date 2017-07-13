import { Collection } from '../Collections/Collection';
export declare type ActionListener = (action: object) => void;
export declare type ActionListenerCancel = () => boolean;
export declare class Dispatcher {
    protected _listeners: Collection<ActionListener>;
    addListener(listener: ActionListener): ActionListenerCancel;
    removeListener(listener: ActionListener): boolean;
    dispatchAction(action: object): void;
}
