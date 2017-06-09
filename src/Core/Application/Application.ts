import {Constructor} from '../types';
import {assertArgumentNotNull} from '../Assertion/Assert';
import {EventEmitter} from '../Events/EventEmitter';


export abstract class Application extends EventEmitter {
    /**
     * @throws {ArgumentNullException} If application constructor is not defined.
     */
    public static bootstrap(): ClassDecorator {
        return <TApplication extends Application>(applicationConstructor: Constructor<TApplication>): void => {
            assertArgumentNotNull('applicationConstructor', applicationConstructor);

            this._instance = new applicationConstructor();

            this._instance.main();
        };
    }


    private static _instance: Application;


    public static get instance(): Application {
        return this._instance;
    }

    
    public abstract main(): Promise<void>;
}
