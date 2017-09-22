import {ThrottledMethod} from '../../Async/ThrottledMethod';
import {Target} from './Target';
import {DecoratorTarget} from '../Support/Decorators/DecoratorTarget';


export function Throttle(
    timeout: number,
    leading: boolean = false,
    trailing: boolean = true,
    maxWait: number = Infinity
): MethodDecorator {
    return (function (
        prototype: object,
        methodName: string,
        descriptor: TypedPropertyDescriptor<Function>
    ): TypedPropertyDescriptor<Function> {
        Target(DecoratorTarget.Method)(...arguments);

        const method: Function = descriptor.value as Function;
        const throttledMethod: ThrottledMethod = new ThrottledMethod(method, timeout, leading, trailing, maxWait);

        return {
            value: function () {
                return throttledMethod.call(this, arguments);
            }
        };
    }) as MethodDecorator;
}

