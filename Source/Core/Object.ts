import {IDisposable} from './Abstraction/IDisposable';
import {EventBindings} from '../Events/EventBindings';


export class Object implements IDisposable {
    protected readonly _eventBindings: EventBindings<this> = new EventBindings(this);


    public dispose(): void {
        this._eventBindings.dispose();
    }
}
