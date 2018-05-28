import {Type} from '@monument/core/main/Type';
import {ApplicationDecorator} from './ApplicationDecorator';


export function Application(configuration: {
    modules: Array<Type<object>>
}) {
    return function (...args: any[]) {
        const decorator = new ApplicationDecorator(configuration.modules);

        decorator.apply(args);
    };
}
