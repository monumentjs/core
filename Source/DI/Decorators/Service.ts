import {UnitScope} from '../Unit/UnitScope';
import {DecoratorTarget} from '../../Language/Support/Decorators/DecoratorTarget';
import {Scope} from './Scope';
import {Target} from '../../Language/Decorators/Target';


export function Service(): ClassDecorator {
    return function (target: Function) {
        Target(DecoratorTarget.Class)(...arguments);
        Scope(UnitScope.Singleton)(target);
    };
}
