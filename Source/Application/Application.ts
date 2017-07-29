import {Constructor} from '../types';
import {Assert} from '../Assertion/Assert';
import {EventEmitter} from '../Events/EventEmitter';
import {ApplicationException} from './ApplicationException';
import {IApplicationContext} from './IApplicationContext';


export abstract class Application extends EventEmitter {
    /**
     * @throws {ArgumentNullException} If application constructor is not defined.
     */
    public static bootstrap(context?: IApplicationContext): ClassDecorator {
        return (constructor: Constructor<Application>): void => {
            Assert.argument('constructor', constructor).notNull();

            if (this._instance != null) {
                throw new ApplicationException(
                    `Unable to bootstrap one more application. ` +
                    `Application "${this._instance.constructor.name}" already running.`
                );
            }

            this._instance = new constructor(context);

            this._instance.main();
        };
    }


    private static _instance: Application;


    public static get instance(): Application {
        return this._instance;
    }


    private _context: IApplicationContext;


    public get context(): IApplicationContext {
        return this._context;
    }


    public constructor(context?: IApplicationContext) {
        super();

        if (context.applicationConfiguration) {
            context.applicationConfiguration.checkValidity();
        }

        this._context = context;
    }


    public abstract main(): Promise<void>;
}
