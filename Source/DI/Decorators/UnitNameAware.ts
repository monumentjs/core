import {UnitDefinition} from '../Unit/UnitDefinition';
import {Type} from '../../Core/Types/Type';
import {Target} from '../../Language/Decorators/Target';
import {DecoratorTarget} from '../../Language/Support/Decorators/DecoratorTarget';


export function UnitNameAware(): ClassDecorator {
    return function (target: Function): void {
        Target(DecoratorTarget.Class)(...arguments);

        const definition: UnitDefinition = UnitDefinition.of(target as Type);

        definition.isUnitNameAware = true;
    };
}
