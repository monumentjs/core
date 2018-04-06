import {Target} from '../../../../../reflection/main/decorators/Target';
import {DecoratorTarget} from '../../../../../reflection/main/decorators/DecoratorTarget';
import {WithDecorator} from '@monument/reflection/main/decorators/WithDecorator';


export function Primary(): ClassDecorator {
    return function () {
        Target([DecoratorTarget.CLASS, DecoratorTarget.METHOD])(...arguments);
        WithDecorator(Primary)(...arguments);
    };
}
