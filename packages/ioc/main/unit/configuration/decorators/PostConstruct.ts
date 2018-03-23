import {Target} from '@monument/core/main/decorators/Target';
import {DecoratorTarget} from '@monument/core/main/decorators/support/DecoratorTarget';
import {WithDecorator} from '@monument/reflection/main/decorators/WithDecorator';


export function PostConstruct(): MethodDecorator {
    return function (...args: any[]) {
        Target([DecoratorTarget.METHOD])(...arguments);
        WithDecorator(PostConstruct)(...arguments);
    };
}
