import {IUnitConfiguration} from './IUnitConfiguration';
import {Constructor} from '../../types';
import {UnitProvider} from '../Providers/UnitProvider';
import {UnitReflection} from '../Reflections/UnitReflection';
import {Assert} from '../../Assertion/Assert';
import {UnitProviderFactory} from '../Providers/UnitProviderFactory';


export function Unit<T>(unitConfiguration: IUnitConfiguration<T> = {}): ClassDecorator {
    Assert.argument('unitConfiguration', unitConfiguration).notNull();

    return function (type: Constructor<T>): Constructor<T> {
        const provider: UnitProvider<T> = UnitProviderFactory.instance.createUnitProvider(type, unitConfiguration);
        const reflection: UnitReflection<T> = new UnitReflection(type);

        reflection.provider = provider;

        return type;
    };
}
