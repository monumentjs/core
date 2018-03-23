import {WithDecorator} from '../../../../../reflection/main/decorators/WithDecorator';
import {Target} from '../../../../../core/main/decorators/Target';
import {DecoratorTarget} from '../../../../../core/main/decorators/support/DecoratorTarget';


export function Primary(): ClassDecorator {
    return function () {
        Target([DecoratorTarget.CLASS, DecoratorTarget.METHOD])(...arguments);
        WithDecorator(Primary)(...arguments);
    };
}
