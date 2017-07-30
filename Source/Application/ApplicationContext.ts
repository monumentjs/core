import {Application} from './Application';
import {IApplicationConfiguration} from './IApplicationConfiguration';
import {Assert} from '../Assertion/Assert';
import {Constructor} from '../types';
import {ApplicationException} from './ApplicationException';


export abstract class ApplicationContext<TConfiguration extends IApplicationConfiguration, TApplication extends Application<TConfiguration>> {
    public get application(): TApplication {
        return this._application;
    }


    public abstract readonly configuration: TConfiguration;


    private _constructor: Constructor<TApplication>;
    private _application: TApplication;


    public constructor(constructor: Constructor<TApplication>) {
        Assert.argument('constructor', constructor).notNull();

        this._constructor = constructor;
    }


    public async bootstrap(): Promise<void> {
        if (this._application != null) {
            throw new ApplicationException(
                `Unable to bootstrap one more application. ` +
                `Application "${this._constructor.name}" already running.`
            );
        }

        this.configuration.checkValidity();

        this._application = new this._constructor(this.configuration);

        await this.application.main();
    }
}
