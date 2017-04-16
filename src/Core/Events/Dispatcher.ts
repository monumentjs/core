import Collection from '../Collections/Collection';
import {assertArgumentNotNull} from '../Assertion/Assert';


export type ActionListener = (action: object) => void;
export type ActionListenerCancel = () => boolean;


export default class Dispatcher {
    protected _listeners: Collection<ActionListener> = new Collection<ActionListener>();


    public addListener(listener: ActionListener): ActionListenerCancel {
        assertArgumentNotNull('listener', listener);

        this._listeners.add(listener);

        return (): boolean => {
            return this.removeListener(listener);
        };
    }


    public removeListener(listener: ActionListener): boolean {
        assertArgumentNotNull('listener', listener);

        return this._listeners.remove(listener);
    }


    public dispatchAction(action: object): void {
        assertArgumentNotNull('action', action);

        for (let listener of this._listeners) {
            listener(action);
        }
    }
}