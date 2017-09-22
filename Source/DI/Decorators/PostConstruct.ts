import {UnitDefinition} from '../Unit/UnitDefinition';
import {Type} from '../../Core/Types/Type';
import {DecoratorTarget} from '../../Language/Support/Decorators/DecoratorTarget';
import {Target} from '../../Language/Decorators/Target';


export function PostConstruct(): MethodDecorator {
    return function (target: object | Function, key: PropertyKey): void {
        Target(DecoratorTarget.Method)(...arguments);

        const definition: UnitDefinition = UnitDefinition.of(target as Type);

        definition.initMethodName = key;
    };
}
