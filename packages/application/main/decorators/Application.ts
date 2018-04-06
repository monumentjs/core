import {Type} from '@monument/core/main/Type';
import {DecoratorTarget} from '../../../reflection/main/decorators/DecoratorTarget';
import {Target} from '@monument/reflection/main/decorators/Target';
import {WithAttribute} from '@monument/reflection/main/decorators/WithAttribute';
import {WithDecorator} from '@monument/reflection/main/decorators/WithDecorator';
import {Configuration} from '@monument/ioc/main/stereotype/Configuration';
import {ApplicationConfiguration} from '../configuration/ApplicationConfiguration';


export function Application(configuration: {
    modules?: Array<Type<object>>
} = {}) {
    return function (...args: any[]) {
        Target([DecoratorTarget.CLASS])(...arguments);
        Configuration()(...arguments);
        WithDecorator(Application)(...arguments);
        WithAttribute(
            ApplicationConfiguration.ATTRIBUTE_KEY,
            new ApplicationConfiguration(configuration.modules)
        )(...arguments);
    };
}
