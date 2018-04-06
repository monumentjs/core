import {Target} from '../../../../../reflection/main/decorators/Target';
import {DecoratorTarget} from '../../../../../reflection/main/decorators/DecoratorTarget';
import {WithDecorator} from '@monument/reflection/main/decorators/WithDecorator';


export function PreDestroy(): MethodDecorator {
    return function () {
        Target([DecoratorTarget.METHOD])(...arguments);
        WithDecorator(PreDestroy)(...arguments);
    };
}
