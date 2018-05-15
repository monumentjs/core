import {Type} from '@monument/core/main/Type';
import {ApplicationConfiguration} from './ApplicationConfiguration';
import {ApplicationDecorator} from './ApplicationDecorator';


export function Application(configuration: {
    components?: Array<Type<object>>,
    modules?: Array<Type<object>>
} = {}) {
    return function (...args: any[]) {
        const decorator = new ApplicationDecorator(
            new ApplicationConfiguration(
                configuration.modules,
                configuration.components
            )
        );

        decorator.apply(args);
    };
}
