import {UnitDefinition} from '../Unit/UnitDefinition';
import {Type} from '../../Core/Types/Type';
import {DecoratorTarget} from '../../Language/Support/Decorators/DecoratorTarget';
import {Target} from '../../Language/Decorators/Target';


export function InitializingUnit(): ClassDecorator {
    return function (target: Function): void {
        Target(DecoratorTarget.Class)(...arguments);

        const definition: UnitDefinition = UnitDefinition.of(target as Type);

        definition.isInitializing = true;
    };
}
