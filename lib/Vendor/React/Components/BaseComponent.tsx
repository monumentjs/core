import * as React from 'react';
import {Pool} from '../../../Core/types';
import {IActionListenerCancel} from '../../../Core/Dispatcher';


export default class BaseComponent<P, S> extends React.Component<P, S> {
    private _subscriptions: Pool<IActionListenerCancel>;


    constructor(props?: P, context?: any) {
        super(props, context);

        this._subscriptions = Object.create(null);
    }


    protected startSubscription(alias: string, cancel: IActionListenerCancel) {
        this.endSubscription(alias);
        this._subscriptions[alias] = cancel;
    }


    protected endSubscription(alias: string): boolean {
        var cancel: IActionListenerCancel = this._subscriptions[alias];
        var cancelled: boolean = false;

        if (typeof cancel === 'function') {
            cancel();
            cancelled = true;
        }

        delete this._subscriptions[alias];

        return cancelled;
    }


    protected invoke(callbackName: string, ...args: any[]): any {
        var callback = this.props[callbackName];

        if (typeof callback === 'function') {
            return callback(...args);
        }
    }
}