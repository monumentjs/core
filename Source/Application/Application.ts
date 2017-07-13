import {Constructor} from '../types';
import {Assert} from '../Assertion/Assert';
import {EventEmitter} from '../Events/EventEmitter';


export abstract class Application extends EventEmitter {
    /**
     * @throws {ArgumentNullException} If application constructor is not defined.
     */
    public static bootstrap(): ClassDecorator {
        return (constructor: Function): void => {
            Assert.argument('constructor', constructor).notNull();

            this._instance = new (constructor as Constructor<Application>)();

            this._instance.main();
        };
    }


    private static _instance: Application;


    public static get instance(): Application {
        return this._instance;
    }

    
    public abstract main(): Promise<void>;
}
