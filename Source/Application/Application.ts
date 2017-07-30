import {EventEmitter} from '../Events/EventEmitter';
import {IApplicationConfiguration} from './IApplicationConfiguration';
import {Assert} from '../Assertion/Assert';
import {Constructor} from '../types';
import {Container} from '../DI/Container';


export abstract class Application<TConfiguration extends IApplicationConfiguration> extends EventEmitter {
    /**
     * @throws {ArgumentNullException} If application constructor is not defined.
     */
    public static bootstrap(): ClassDecorator {
        return async (constructor: Constructor<Application<any>>): Promise<void> => {
            Assert.argument('constructor', constructor).notNull();

            this._instance = Container.instance.get(constructor);

            await this._instance.main();
        };
    }


    public static get instance(): Application<IApplicationConfiguration> {
        return this._instance;
    }


    private static _instance: Application<IApplicationConfiguration>;


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
