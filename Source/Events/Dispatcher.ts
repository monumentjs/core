import {Collection} from '../Collections/Collection';
import {ActionListener, ActionListenerCancel} from './types';


export class Dispatcher {
    private _listeners: Collection<ActionListener> = new Collection();


    public addListener(listener: ActionListener): ActionListenerCancel {
        this._listeners.add(listener);

        return (): boolean => {
            return this.removeListener(listener);
        };
    }


    public removeListener(listener: ActionListener): boolean {
        return this._listeners.remove(listener);
    }


    public removeAllListeners(): boolean {
        return this._listeners.clear();
    }


    public dispatchAction(action: object): void {
        for (let listener of this._listeners) {
            listener(action);
        }
    }
}
