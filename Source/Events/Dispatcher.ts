import {Collection} from '../Collections/Collection';
import {Assert} from '../Assertion/Assert';


export type ActionListener = (action: object) => void;
export type ActionListenerCancel = () => boolean;


export class Dispatcher {
    protected _listeners: Collection<ActionListener> = new Collection<ActionListener>();


    public addListener(listener: ActionListener): ActionListenerCancel {
        Assert.argument('listener', listener).notNull();

        this._listeners.add(listener);

        return (): boolean => {
            return this.removeListener(listener);
        };
    }


    public removeListener(listener: ActionListener): boolean {
        Assert.argument('listener', listener).notNull();

        return this._listeners.remove(listener);
    }


    public dispatchAction(action: object): void {
        Assert.argument('action', action).notNull();

        for (let listener of this._listeners) {
            listener(action);
        }
    }
}
