import {Type} from '@monument/core/main/Type';
import {ModuleConfiguration} from './ModuleConfiguration';
import {ModuleDecorator} from './ModuleDecorator';


export function Module(configuration: {
    imports?: Iterable<Type<object>>;
    exports?: Iterable<Type<object>>;
} = {}) {
    return function (...args: any[]) {
        const configuration1 = new ModuleConfiguration(configuration.imports, configuration.exports);
        const decorator = new ModuleDecorator(configuration1);

        decorator.apply(args);
    };
}
