import {TestConfigurationDecorator} from './TestConfigurationDecorator';
import {Type} from '@monument/core/main/Type';


export function TestConfiguration(configuration: {
    modules?: Array<Type<object>>,
    components?: Array<Type<object>>
}) {
    return function (...args: any[]) {
        new TestConfigurationDecorator(
            configuration.components || [],
            configuration.modules || []
        ).apply(args);
    };
}
