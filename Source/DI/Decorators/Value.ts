import {Constructor} from '../../types';
import {UnitReflection} from '../Reflections/UnitReflection';


export function Value<T>(token: Constructor<T>): PropertyDecorator {
    return function (target: object | Constructor<T>, property: string | symbol): void {
        const constructor: Constructor<T> = typeof target === 'object' ? target.constructor as Constructor<T> : target;
        const reflection: UnitReflection<T> = new UnitReflection(constructor);

        reflection.propertyInjectors.set(property, token);
    };
}
