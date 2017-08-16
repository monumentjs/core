import {Constructor} from '../../types';
import {Container} from '../Container/Container';
import {Assert} from '../../Assertion/Assert';


export function UnitGetter<T>(type: Constructor<T>): PropertyDecorator {
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
