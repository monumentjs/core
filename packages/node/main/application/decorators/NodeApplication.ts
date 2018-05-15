import {Type} from '@monument/core/main/Type';
import {ApplicationConfiguration} from '@monument/stereotype/main/ApplicationConfiguration';
import {NodeApplicationDecorator} from './NodeApplicationDecorator';


export function NodeApplication(configuration: {
    components?: Array<Type<object>>,
    modules?: Array<Type<object>>
} = {}) {
    return function (...args: any[]) {
        new NodeApplicationDecorator(
            new ApplicationConfiguration(
                configuration.modules,
                configuration.components
            )
        ).apply(args);
    };
}
