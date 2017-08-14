import {Constructor} from '../../types';
import {UnitReflection} from '../Reflections/UnitReflection';
import {InvalidOperationException} from '../../Exceptions/InvalidOperationException';
import {PropertyDefinition} from '../../Language/Reflection/PropertyDefinition';

/**
 * Marks class property or setter as injectable.
 * DI container will automatically resolve dependencies and assign values to each property marked with @Inject decorator.
 * Properties will be injected after class being instantiated.
 *
 * @param {Constructor<T>} type Type of property value.
 * @returns {PropertyDecorator}
 */
export function Inject<T>(type: Constructor<T>): PropertyDecorator {
    return function (target: object, property: string | symbol): void {
        if (typeof target === 'object') {
            const reflection: UnitReflection<T> = new UnitReflection(target.constructor as Constructor<T>);

            reflection.propertyDefinitions.add(new PropertyDefinition(property, type));
        } else {
            throw new InvalidOperationException('This decorator can be applied to class instance members only.');
        }
    };
}
