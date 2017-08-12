import {Constructor} from '../../types';
import {UnitReflection} from '../Reflections/UnitReflection';
import {UnitProvider} from '../Providers/UnitProvider';
import {MissingConstructorArgumentsException} from './MissingConstructorArgumentsException';
import {UnitProviderConfiguration} from '../Providers/UnitProviderConfiguration';
import {FactoryUnitProvider} from '../Providers/FactoryUnitProvider';
import {Container} from './Container';
import {Assert} from '../../Assertion/Assert';


export class UnitBuilder {
    public static get instance(): UnitBuilder {
        if (this._instance == null) {
            this._instance = new UnitBuilder();
        }

        return this._instance;
    }


    private static _instance: UnitBuilder;


    public createUnit<T>(container: Container, type: Constructor<T>): T {
        Assert.argument('container', container).notNull();
        Assert.argument('type', type).notNull();

        const reflection: UnitReflection<T> = new UnitReflection(type);

        let provider: UnitProvider<T> = reflection.provider;

        if (provider == null) {
            provider = this.getDefaultProvider(type);
        }

        return this.createUnitFromProvider(container, provider);
    }


    public createUnitFromProvider<T>(container: Container, provider: UnitProvider<T>): T {
        Assert.argument('container', container).notNull();
        Assert.argument('provider', provider).notNull();

        return provider.getInstance(container);
    }


    private getDefaultProvider<T>(type: Constructor<T>): UnitProvider<T> {
        if (type.length === 0) {
            return this.createDefaultProvider(type);
        } else {
            throw new MissingConstructorArgumentsException(type, 0);
        }
    }


    private createDefaultProvider<T>(type: Constructor<T>): UnitProvider<T> {
        const configuration: UnitProviderConfiguration<T> = new UnitProviderConfiguration(type, {});

        return new FactoryUnitProvider(configuration);
    }
}
