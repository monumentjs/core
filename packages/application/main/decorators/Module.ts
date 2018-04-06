import {Type} from '@monument/core/main/Type';
import {DecoratorTarget} from '../../../reflection/main/decorators/DecoratorTarget';
import {Target} from '@monument/reflection/main/decorators/Target';
import {WithDecorator} from '@monument/reflection/main/decorators/WithDecorator';
import {WithAttribute} from '@monument/reflection/main/decorators/WithAttribute';
import {Configuration} from '@monument/ioc/main/stereotype/Configuration';
import {ModuleConfiguration} from '../configuration/ModuleConfiguration';


export function Module(configuration: {
    imports?: Iterable<Type<object>>;
    exports?: Iterable<Type<object>>;
} = {}): ClassDecorator {
    return function (target: Function) {
        Target([DecoratorTarget.CLASS])(...arguments);
        Configuration()(...arguments);
        WithDecorator(Module)(...arguments);
        WithAttribute(
            ModuleConfiguration.ATTRIBUTE_KEY,
            new ModuleConfiguration(configuration.imports, configuration.exports)
        )(...arguments);
    };
}
