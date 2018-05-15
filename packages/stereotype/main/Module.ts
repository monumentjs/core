import {Type} from '@monument/core/main/Type';
import {ModuleConfiguration} from './ModuleConfiguration';
import {ModuleDecorator} from './ModuleDecorator';


export function Module(configuration: {
    components?: Iterable<Type<object>>;
} = {}) {
    return function (...args: any[]) {
        const configuration1 = new ModuleConfiguration(configuration.components);
        const decorator = new ModuleDecorator(configuration1);

        decorator.apply(args);
    };
}
