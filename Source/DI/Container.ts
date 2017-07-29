import {IProviderConfiguration} from './IProviderConfiguration';
import {Constructor} from '../types';
import {Assert} from '../Assertion/Assert';
import {ProvidersRegistry} from './ProvidersRegistry';
import {FactoryProvider} from './FactoryProvider';
import {SingletonProvider} from './SingletonProvider';
import {Provider} from './Provider';
import {ProviderConfiguration} from './ProviderConfiguration';
import {ProviderNotFoundException} from './ProviderNotFoundException';
import {ConstructorException} from './ConstructorException';
import {ProviderToken} from './types';


export class Container {
    public static get instance(): Container {
        if (this._instance == null) {
            this._instance = new Container();
        }

        return this._instance;
    }


    private static _instance: Container;


    private _providers: ProvidersRegistry;


    public constructor() {
        this._providers = new ProvidersRegistry();
    }


    public get<T>(token: ProviderToken<T>): T {
        Assert.argument('token', token).notNull();

        let provider: Provider<T> = this._providers.get(token);
        let providerNotFound = provider == null;

        if (providerNotFound && typeof token === 'function' && token.length === 0) {
            return new token();
        }

        if (providerNotFound && typeof token === 'function' && token.length > 0) {
            throw new ConstructorException(`Constructor requires ${token.length} arguments.`);
        }

        if (providerNotFound) {
            throw new ProviderNotFoundException(token);
        }

        return provider.getInstance(this);
    }


    public register<T>(type: Constructor<T>, configuration: IProviderConfiguration<T>): void {
        Assert.argument('type', type).notNull();
        Assert.argument('configuration', configuration).notNull();

        let providerConfiguration: ProviderConfiguration<T> = this.createProviderConfiguration(type, configuration);
        let provider: Provider<T> = this.createProvider(providerConfiguration);

        this._providers.set(providerConfiguration.token, provider);
    }


    public replace<TBase>(oldToken: ProviderToken<TBase>, type: Constructor<TBase>, configuration: IProviderConfiguration<TBase>): void {
        Assert.argument('oldToken', oldToken).notNull();
        Assert.argument('type', type).notNull();
        Assert.argument('configuration', configuration).notNull();

        let providerConfiguration: ProviderConfiguration<TBase> = this.createProviderConfiguration(type, configuration);
        let newProvider: Provider<TBase> = this.createProvider(providerConfiguration);

        this._providers.replace(oldToken, newProvider);
    }


    public unregister<T>(token: ProviderToken<T>): boolean {
        return this._providers.removeByKey(token);
    }


    public clear(): void {
        this._providers.clear();
    }


    protected createProviderConfiguration<T>(type: Constructor<T>, configuration: IProviderConfiguration<T>): ProviderConfiguration<T> {
        return new ProviderConfiguration(type, configuration);
    }


    protected createProvider<T>(providerConfiguration: ProviderConfiguration<T>): Provider<T> {
        let provider: Provider<T>;

        if (providerConfiguration.isSingleton) {
            provider = new SingletonProvider(providerConfiguration);
        } else {
            provider = new FactoryProvider(providerConfiguration);
        }

        return provider;
    }
}
