import {Constructor} from '../../types';
import {Container} from '../Container/Container';
import {Assert} from '../../Assertion/Assert';

/**
 * Creates class property with 'get' accessor that provides instance of unit of specified type.
 *
 * @param type Type of property value.
 */
export function Inject<T>(type: Constructor<T>): PropertyDecorator {
    Assert.argument('type', type).notNull();

    return function (prototype: object, property: string | symbol): void {
        const valueKey: symbol = Symbol();

        Object.defineProperty(prototype, property, {
            get(): T {
                if (this[valueKey] == null) {
                    this[valueKey] = Container.get(type);
                }

                return this[valueKey];
            }
        });
    };
}
