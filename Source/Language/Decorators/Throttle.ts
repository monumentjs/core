import {ThrottledMethod} from './Helpers/ThrottledMethod';
import {Assert} from '../../Assertion/Assert';


export function Throttle(
    timeout: number,
    leading: boolean = false,
    trailing: boolean = true,
    maxWait: number = Infinity
): MethodDecorator {
    return function (
        prototype: object,
        methodName: string,
        descriptor: TypedPropertyDescriptor<Function>
    ): TypedPropertyDescriptor<Function> {
        Assert.argument('descriptor', descriptor).notNull();
        Assert.argument('descriptor.value', descriptor.value).notNull();

        const method: Function = descriptor.value as Function;
        const throttledMethod: ThrottledMethod = new ThrottledMethod(method, timeout, leading, trailing, maxWait);

        return {
            value: function () {
                return throttledMethod.call(this, arguments);
            }
        };
    };
}

