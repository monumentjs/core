import {Constructor} from '../../types';
import {UnitReflection} from '../Reflections/UnitReflection';
import {InvalidOperationException} from '../../Exceptions/InvalidOperationException';
import {PropertyDefinition} from '../../Language/Reflection/PropertyDefinition';


export function Inject<T>(type: Constructor<T>): PropertyDecorator {
    return function (target: object, property: string | symbol): void {
        if (typeof target === 'object') {
            const reflection: UnitReflection<T> = new UnitReflection(target.constructor as Constructor<T>);

            reflection.propertyDefinitions.add(new PropertyDefinition(property, type));
        } else {
            throw new InvalidOperationException('Usage of decorator is restricted to class instance members only.');
        }
    };
}
