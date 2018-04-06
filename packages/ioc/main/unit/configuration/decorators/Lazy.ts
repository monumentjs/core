import {WithDecorator} from '@monument/reflection/main/decorators/WithDecorator';
import {Target} from '../../../../../reflection/main/decorators/Target';
import {DecoratorTarget} from '../../../../../reflection/main/decorators/DecoratorTarget';


export function Lazy(): ClassDecorator {
    return function () {
        Target([DecoratorTarget.CLASS, DecoratorTarget.METHOD])(...arguments);
        WithDecorator(Lazy)(...arguments);
    };
}
