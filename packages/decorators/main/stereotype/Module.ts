import {Type} from '@monument/core/main/Type';
import {ModuleDecorator} from './ModuleDecorator';


export function Module(configuration: {
    components: Array<Type<object>>;
}) {
    return function (...args: any[]) {
        const decorator = new ModuleDecorator(configuration.components);

        decorator.apply(args);
    };
}
