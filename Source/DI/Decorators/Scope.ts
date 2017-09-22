import {Type} from '../../Core/Types/Type';
import {UnitDefinition} from '../Unit/UnitDefinition';
import {UnitScope} from '../Unit/UnitScope';
import {DecoratorTarget} from '../../Language/Support/Decorators/DecoratorTarget';
import {Target} from '../../Language/Decorators/Target';


export function Scope<T>(scope: UnitScope): ClassDecorator {
    return function (target: Function) {
        Target(DecoratorTarget.Class)(...arguments);

        const definition: UnitDefinition<T> = UnitDefinition.of(target as Type<T>);

        definition.scope = scope;
    };
}
