import {EventEmitter} from '../Events/EventEmitter';


export abstract class Application extends EventEmitter {

    /**
     * Application entry point. End-point application's logic starts with call to this method.
     */
    public abstract main(): Promise<void>;
}
