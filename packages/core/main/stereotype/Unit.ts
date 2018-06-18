import {UnitDecorator} from './UnitDecorator';
import {Type} from '../Type';


export function Unit(type: Type<object>) {
    return function (...args: any[]) {
        new UnitDecorator(type).apply(args);
    };
}
