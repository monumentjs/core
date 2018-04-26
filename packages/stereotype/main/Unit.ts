import {Type} from '@monument/core/main/Type';
import {UnitConfiguration} from './UnitConfiguration';
import {UnitDecorator} from './UnitDecorator';


export function Unit(type: Type<object>) {
    return function (...args: any[]) {
        const configuration = new UnitConfiguration(type);
        const decorator = new UnitDecorator(configuration);

        decorator.apply(args);
    };
}
