import {Type} from '@monument/core/main/Type';
import {Target} from '@monument/core/main/decorators/Target';
import {DecoratorTarget} from '@monument/core/main/decorators/support/DecoratorTarget';
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
