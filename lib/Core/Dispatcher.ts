import Collection from './Collections/Collection';
import ArgumentNullException from './Exceptions/ArgumentNullException';


export type ActionListener = (action: object) => void;
export type ActionListenerCancel = () => boolean;


export default class Dispatcher {
    protected _listeners: Collection<ActionListener> = new Collection<ActionListener>();


    public addListener(listener: ActionListener): ActionListenerCancel {
        if (listener == null) {
            throw new ArgumentNullException('listener');
        }

        this._listeners.add(listener);

        return (): boolean => {
            return this.removeListener(listener);
        };
    }


    public removeListener(listener: ActionListener): boolean {
        if (listener == null) {
            throw new ArgumentNullException('listener');
        }

        return this._listeners.remove(listener);
    }


    public dispatchAction(action: object): void {
        if (action == null) {
            throw new ArgumentNullException('action');
        }

        for (let listener of this._listeners) {
            listener(action);
        }
    }
}