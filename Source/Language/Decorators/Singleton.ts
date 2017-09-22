import {Type} from '../../Core/Types/Type';
import {IEnumerable} from '../../Collections/Abstraction/IEnumerable';
import {Target} from './Target';
import {DecoratorTarget} from '../Support/Decorators/DecoratorTarget';


export function Singleton(key: PropertyKey = 'instance', args: IEnumerable<any> = []): ClassDecorator {
    return function (target: Function) {
        Target(DecoratorTarget.Class)(...arguments);

        const instanceKey: symbol = Symbol();

        Object.defineProperty(target, key, {
            get: function (this: any) {
                if (this[instanceKey] == null) {
                    this[instanceKey] = new (target as Type)(...args);
                }

                return this[instanceKey];
            }
        });
    };
}
