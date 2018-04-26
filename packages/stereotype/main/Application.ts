import {Type} from '@monument/core/main/Type';
import {ApplicationConfiguration} from './ApplicationConfiguration';
import {ApplicationDecorator} from './ApplicationDecorator';


export function Application(configuration: {
    modules?: Array<Type<object>>
} = {}) {
    return function (...args: any[]) {
        const configuration1 = new ApplicationConfiguration(configuration.modules);
        const decorator = new ApplicationDecorator(configuration1);

        decorator.apply(args);
    };
}
