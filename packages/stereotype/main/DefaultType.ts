import {Type} from '@monument/core/main/Type';
import {DefaultTypeConfiguration} from './DefaultTypeConfiguration';
import {DefaultTypeDecorator} from './DefaultTypeDecorator';


export function DefaultType<T extends object>(type: Type<T>): ParameterDecorator {
    return function (...args: any[]) {
        const configuration = new DefaultTypeConfiguration(type);
        const decorator = new DefaultTypeDecorator(configuration);

        decorator.apply(args);
    };
}
