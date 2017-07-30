import {EventEmitter} from '../Events/EventEmitter';
import {IApplicationConfiguration} from './IApplicationConfiguration';
import {Assert} from '../Assertion/Assert';
import {Constructor} from '../types';
import {ApplicationContext} from './ApplicationContext';


export abstract class Application<TConfiguration extends IApplicationConfiguration> extends EventEmitter {
    /**
     * @throws {ArgumentNullException} If application constructor is not defined.
     */
    public static bootstrap<TConfig extends IApplicationConfiguration, TApp extends Application<TConfig>>(contextType: Constructor<ApplicationContext<TConfig, TApp>>): ClassDecorator {
        Assert.argument('contextType', contextType).notNull();

        return async (constructor: Constructor<TApp>): Promise<void> => {
            Assert.argument('constructor', constructor).notNull();

            this._context = new contextType(constructor);

            await this._context.bootstrap();
        };
    }


    public static get context(): ApplicationContext<any, any> {
        return this._context;
    }


    private static _context: ApplicationContext<any, any>;


    private _configuration: TConfiguration;


    public get configuration(): TConfiguration {
        return this._configuration;
    }


    public constructor(configuration: TConfiguration) {
        super();

        Assert.argument('configuration', configuration).notNull();

        this._configuration = configuration;
    }

    /**
     * Application entry point. End-point application's logic starts with call to this method.
     */
    public abstract main(): Promise<void>;

}
