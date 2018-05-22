import {Type} from '@monument/core/main/Type';
import {UnitDecorator} from './UnitDecorator';


export function Unit(type: Type<object>) {
    return function (...args: any[]) {
        new UnitDecorator(type).apply(args);
    };
}
