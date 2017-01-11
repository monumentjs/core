
export interface IAction {
    type: any;
}


export interface IActionListener<A> {
    (action: A): void;
}

export interface IActionListenerCancel {
    (): boolean;
}


export default class Dispatcher<A extends IAction, L extends IActionListener<A>> {
    private _listeners: L[];


    constructor() {
        this._listeners = [];
    }


    public subscribe(listener: L): IActionListenerCancel {
        this._listeners.push(listener);

        return (): boolean => {
            return this.unsubscribe(listener);
        };
    }


    public unsubscribe(listener: L): boolean {
        let index = this._listeners.indexOf(listener);

        if (index < 0) {
            return false;
        }

        this._listeners.splice(index, 1);

        return true;
    }


    public dispatch(action: A) {
        this._listeners.forEach((listener) => {
            listener(action);
        });
    }
}