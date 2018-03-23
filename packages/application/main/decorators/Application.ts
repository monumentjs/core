import {Type} from '@monument/core/main/Type';
import {Target} from '@monument/core/main/decorators/Target';
import {DecoratorTarget} from '@monument/core/main/decorators/support/DecoratorTarget';
import {Configuration} from '@monument/ioc/main/stereotype/Configuration';
import {WithDecorator} from '@monument/reflection/main/decorators/WithDecorator';
import {WithAttribute} from '@monument/reflection/main/decorators/WithAttribute';
import {ApplicationConfiguration} from '../configuration/ApplicationConfiguration';


export function Application(configuration: {
    imports?: Array<Type<object>>
} = {}) {
    return function (...args: any[]) {
        Target([DecoratorTarget.CLASS])(...arguments);
        Configuration()(...arguments);
        WithDecorator(Application)(...arguments);
        WithAttribute(
            ApplicationConfiguration.ATTRIBUTE_KEY,
            new ApplicationConfiguration(configuration.imports)
        )(...arguments);
    };
}
