import {Constructor} from '../types';
import {Assert} from '../Assertion/Assert';
import {EventEmitter} from '../Events/EventEmitter';
import {ApplicationException} from './ApplicationException';


export abstract class Application extends EventEmitter {
    /**
     * @throws {ArgumentNullException} If application constructor is not defined.
     */
    public static bootstrap(): ClassDecorator {
        return (constructor: Constructor<Application>): void => {
            Assert.argument('constructor', constructor).notNull();

            if (this._instance != null) {
                throw new ApplicationException(
                    `Unable to bootstrap one more application. ` +
                    `Application "${this._instance.constructor.name}" already running.`
                );
            }

            this._instance = new constructor();

            this._instance.main();
        };
    }


    private static _instance: Application;


    public static get instance(): Application {
        return this._instance;
    }


    public abstract main(): Promise<void>;
}
