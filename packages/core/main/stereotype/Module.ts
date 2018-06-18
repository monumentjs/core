import {Type} from '../Type';
import {ModuleDecorator} from './ModuleDecorator';


export function Module(configuration: {
    components: Array<Type<object>>;
    dependsOn?: Array<Type<object>>;
}) {
    return function (...args: any[]) {
        const decorator = new ModuleDecorator(configuration.components, configuration.dependsOn);

        decorator.apply(args);
    };
}
