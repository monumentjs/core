import {Constructor} from '../../types';
import {Container} from '../Container/Container';


export function UnitGetter<T>(type: Constructor<T>): PropertyDecorator {
    return function (target: object, property: string | symbol): void {
        Object.defineProperty(target, property, {
            get(): T {
                return Container.get(type);
            }
        });
    };
}
