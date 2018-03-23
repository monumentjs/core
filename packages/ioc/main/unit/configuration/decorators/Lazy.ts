import {WithDecorator} from '@monument/reflection/main/decorators/WithDecorator';
import {Target} from '@monument/core/main/decorators/Target';
import {DecoratorTarget} from '@monument/core/main/decorators/support/DecoratorTarget';


export function Lazy(): ClassDecorator {
    return function () {
        Target([DecoratorTarget.CLASS, DecoratorTarget.METHOD])(...arguments);
        WithDecorator(Lazy)(...arguments);
    };
}
