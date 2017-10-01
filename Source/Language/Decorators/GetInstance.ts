import {Type} from '../../Core/Types/Type';
import {Target} from './Target';
import {DecoratorTarget} from '../Support/Decorators/DecoratorTarget';


export function GetInstance(...args: any[]): PropertyDecorator {
    return function (target: Function, key: PropertyKey) {
        Target(DecoratorTarget.Property)(...arguments);

        const valueKey: symbol = Symbol();

        Object.defineProperty(target, key, {
            get: function (this: any) {
                if (this[valueKey] == null) {
                    this[valueKey] = new (target as Type)(...args);
                }

                return this[valueKey];
            }
        });
    };
}
