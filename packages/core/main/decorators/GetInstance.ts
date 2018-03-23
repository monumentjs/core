import {Type} from '../Type';
import {DecoratorTarget} from './support/DecoratorTarget';
import {Target} from './Target';


export function GetInstance(): PropertyDecorator {
    return function (...args: any[]) {
        Target([DecoratorTarget.PROPERTY])(...args);

        const target: object = args[0];
        const key: PropertyKey = args[1];
        const valueKey: symbol = Symbol();

        Object.defineProperty(target, key, {
            get: function (this: any) {
                if (!this.hasOwnProperty(valueKey)) {
                    this[valueKey] = new (target as Type)(...args);
                }

                return this[valueKey];
            }
        });
    };
}
