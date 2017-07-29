import {ProviderConfiguration} from './ProviderConfiguration';
import {Assert} from '../Assertion/Assert';
import {ProviderToken} from './types';
import {Container} from './Container';


export abstract class Provider<T> {
    public readonly configuration: ProviderConfiguration<T>;


    public constructor(configuration: ProviderConfiguration<T>) {
        Assert.argument('configuration', configuration).notNull();

        this.configuration = configuration;
    }


    public abstract getInstance(container: Container): T;


    protected createInstance(container: Container): T {
        let args: any[] = this.getDependencies(container);

        return new this.configuration.type(...args);
    }


    protected getDependencies(container: Container): any[] {
        return this.configuration.providers.map((token: ProviderToken<any>): any => {
            return container.get(token);
        });
    }
}
