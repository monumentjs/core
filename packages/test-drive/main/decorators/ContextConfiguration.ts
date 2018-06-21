import {ContextConfigurationDecorator} from './ContextConfigurationDecorator';
import {Type} from '@monument/core/main/Type';


export function ContextConfiguration(configuration: {
    modules?: Array<Type<object>>,
    components?: Array<Type<object>>
}) {
    return function (...args: any[]) {
        new ContextConfigurationDecorator(
            configuration.components || [],
            configuration.modules || []
        ).apply(args);
    };
}
