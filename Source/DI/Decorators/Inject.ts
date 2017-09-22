import {Decorator} from '../../Language/Support/Decorators/Decorator';
import {DecoratorTarget} from '../../Language/Support/Decorators/DecoratorTarget';
import {CoreType} from '../../Core/Types/CoreType';
import {UnitDefinition} from '../Unit/UnitDefinition';
import {Target} from '../../Language/Decorators/Target';
import {Type} from '../../Core/Types/Type';
import {Constructor} from '../../Core/Types/Constructor';


export function Inject(unitType: Type) {
    return function (target: object | Function, key: string | symbol, descriptorOrIndex?: number | PropertyDescriptor) {
        Target(DecoratorTarget.Property, DecoratorTarget.Accessor, DecoratorTarget.Parameter)(...arguments);

        const decoratorType: DecoratorTarget = Decorator.findTarget(arguments);
        const constructor: Constructor = (typeof target === CoreType.Class ? target : target.constructor) as Constructor;
        const unitDefinition: UnitDefinition = UnitDefinition.of(constructor);

        switch (decoratorType) {
            case DecoratorTarget.Property:
            case DecoratorTarget.Accessor:
                unitDefinition.setPropertyValue(key, unitType);

                break;

            case DecoratorTarget.Parameter:
                if (key == null) {
                    unitDefinition.setConstructorArgumentType(descriptorOrIndex as number, unitType);
                }

                break;

            default:
        }
    };
}
