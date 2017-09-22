import {DecoratorTarget} from '../../Language/Support/Decorators/DecoratorTarget';
import {CoreType} from '../../Core/Types/CoreType';
import {UnitDefinition} from '../Unit/UnitDefinition';
import {Target} from '../../Language/Decorators/Target';
import {Constructor} from '../../Core/Types/Constructor';


export function Value(value: any) {
    return function (target: object | Function, key: string | symbol, index: number) {
        Target(DecoratorTarget.Parameter)(...arguments);

        const constructor: Constructor = (typeof target === CoreType.Class ? target : target.constructor) as Constructor;
        const unitDefinition: UnitDefinition = UnitDefinition.of(constructor);

        unitDefinition.setConstructorArgumentValue(index, value);
    };
}
