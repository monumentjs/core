import {WithDecorator} from '@monument/reflection/main/decorators/WithDecorator';
import {Target} from '@monument/core/main/decorators/Target';
import {DecoratorTarget} from '@monument/core/main/decorators/support/DecoratorTarget';


export function Destroy(): MethodDecorator {
    return function () {
        Target([DecoratorTarget.METHOD])(...arguments);
        WithDecorator(Destroy)(...arguments);
    };
}
