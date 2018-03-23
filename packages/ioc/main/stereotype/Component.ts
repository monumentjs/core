import {WithDecorator} from '../../../reflection/main/decorators/WithDecorator';
import {Target} from '../../../core/main/decorators/Target';
import {DecoratorTarget} from '../../../core/main/decorators/support/DecoratorTarget';


export function Component() {
    return function (...args: any[]) {
        Target([DecoratorTarget.CLASS])(...arguments);
        WithDecorator(Component)(...arguments);
    };
}
