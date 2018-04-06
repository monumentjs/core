import {WithDecorator} from '../../../reflection/main/decorators/WithDecorator';
import {Target} from '../../../reflection/main/decorators/Target';
import {DecoratorTarget} from '../../../reflection/main/decorators/DecoratorTarget';


export function Component() {
    return function (...args: any[]) {
        Target([DecoratorTarget.CLASS])(...arguments);
        WithDecorator(Component)(...arguments);
    };
}
