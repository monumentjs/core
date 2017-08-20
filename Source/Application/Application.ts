import {EventEmitter} from '../Events/EventEmitter';


export abstract class Application extends EventEmitter {

    /**
     * Application entry point.
     */
    public abstract main(): Promise<void>;
}
