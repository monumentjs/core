export interface IAction {
    type: any;
}
export declare type ActionListener<A> = (action: A) => void;
export declare type ActionListenerCancel = () => boolean;
export default class Dispatcher<A extends IAction, L extends ActionListener<A>> {
    private _listeners;
    constructor();
    subscribe(listener: L): ActionListenerCancel;
    unsubscribe(listener: L): boolean;
    dispatch(action: A): void;
}
