import {Target} from '../../../../../reflection/main/decorators/Target';
import {DecoratorTarget} from '../../../../../reflection/main/decorators/DecoratorTarget';
import {WithDecorator} from '@monument/reflection/main/decorators/WithDecorator';


export function PostConstruct(): MethodDecorator {
    return function (...args: any[]) {
        Target([DecoratorTarget.METHOD])(...arguments);
        WithDecorator(PostConstruct)(...arguments);
    };
}
