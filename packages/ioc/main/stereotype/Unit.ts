import {Type} from '@monument/core/main/Type';
import {Target} from '../../../reflection/main/decorators/Target';
import {DecoratorTarget} from '../../../reflection/main/decorators/DecoratorTarget';
import {WithDecorator} from '@monument/reflection/main/decorators/WithDecorator';
import {WithAttribute} from '@monument/reflection/main/decorators/WithAttribute';
import {UnitConfiguration} from './UnitConfiguration';


export function Unit(type: Type<object>) {
    return function (...args: any[]) {
        Target([DecoratorTarget.METHOD])(...arguments);
        WithDecorator(Unit)(...arguments);
        WithAttribute(
            UnitConfiguration.ATTRIBUTE_KEY,
            new UnitConfiguration(type)
        )(...arguments);
    };
}
