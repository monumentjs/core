import {ThrottledMethod} from './Helpers/ThrottledMethod';


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
        const method: ThrottledMethod = new ThrottledMethod(descriptor.value, timeout, leading, trailing, maxWait);

        return {
            value: function () {
                return method.call(this, arguments);
            }
        };
    };
}

