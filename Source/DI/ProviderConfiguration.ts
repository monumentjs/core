import {IProviderConfiguration} from './IProviderConfiguration';
import {Assert} from '../Assertion/Assert';
import {Constructor} from '../types';
import {ProviderToken} from './types';


export class ProviderConfiguration<T> {
    public readonly id: string;
    public readonly isSingleton: boolean;
    public readonly type: Constructor<T>;
    public readonly token: ProviderToken<T>;
    public readonly providers: Array<ProviderToken<T>>;


    public constructor(type: Constructor<T>, configuration: IProviderConfiguration<T>) {
        Assert.argument('type', type).notNull();
        Assert.argument('configuration', configuration).notNull();

        const {id, isSingleton, providers} = configuration;

        this.isSingleton = isSingleton || false;
        this.id = id;
        this.type = type;
        this.token = id || type;
        this.providers = providers || [];
    }
}
