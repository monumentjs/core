import {UnitProviderConfiguration} from './UnitProviderConfiguration';
import {IUnitConfiguration} from '../Decorators/IUnitConfiguration';
import {Constructor} from '../../types';
import {UnitProvider} from './UnitProvider';
import {SingletonUnitProvider} from './SingletonUnitProvider';
import {FactoryUnitProvider} from './FactoryUnitProvider';


export class UnitProviderFactory {
    public static get instance(): UnitProviderFactory {
        if (this._instance == null) {
            this._instance = new UnitProviderFactory();
        }

        return this._instance;
    }


    private static _instance: UnitProviderFactory;


    public createUnitProvider<T>(type: Constructor<T>, unitConfiguration: IUnitConfiguration<T>): UnitProvider<T> {
        const providerConfiguration: UnitProviderConfiguration<T> = new UnitProviderConfiguration(type, unitConfiguration);
        let provider: UnitProvider<T>;

        if (providerConfiguration.isSingleton) {
            provider = new SingletonUnitProvider(providerConfiguration);
        } else {
            provider = new FactoryUnitProvider(providerConfiguration);
        }

        return provider;
    }
}
