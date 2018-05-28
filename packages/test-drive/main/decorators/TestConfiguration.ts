import {Type} from '@monument/core/main/Type';
import {TestConfigurationDecorator} from './TestConfigurationDecorator';


export function TestConfiguration(configuration: {
    components: Array<Type<object>>
}) {
    return function (...args: any[]) {
        new TestConfigurationDecorator(configuration.components).apply(args);
    };
}
