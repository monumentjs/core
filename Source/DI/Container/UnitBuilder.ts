import {Constructor} from '../../types';
import {UnitReflection} from '../Reflections/UnitReflection';
import {UnitProvider} from '../Providers/UnitProvider';
import {MissingConstructorArgumentsException} from './MissingConstructorArgumentsException';
import {UnitProviderConfiguration} from '../Providers/UnitProviderConfiguration';
import {FactoryUnitProvider} from '../Providers/FactoryUnitProvider';
import {Container} from './Container';
import {Assert} from '../../Assertion/Assert';


export class UnitBuilder {
    public constructor(private container: Container) {
        Assert.argument('container', container).notNull();
    }


    public createUnit<T>(type: Constructor<T>): T {
        const reflection: UnitReflection<T> = new UnitReflection(type);
        let provider: UnitProvider<T> = reflection.provider;
        let providerNotFound: boolean = provider == null;

        if (providerNotFound) {
            provider = this.getDefaultProvider(type);
        }

        return this.createUnitFromProvider(provider);
    }


    public createUnitFromProvider<T>(provider: UnitProvider<T>): T {
        return provider.getInstance(this.container);
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
