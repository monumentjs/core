import {ThrottlingMethod} from './support/ThrottlingMethod';
import {MethodCallEdge} from './support/MethodCallEdge';


export function Throttle(timeout: number, edge?: MethodCallEdge) {
    return function (prototype: object, methodName: string, descriptor: TypedPropertyDescriptor<Function>): TypedPropertyDescriptor<Function> {
        const method: Function = descriptor.value as Function;
        const throttledMethod: ThrottlingMethod = new ThrottlingMethod(method, timeout, edge);

        return {
            value: function () {
                return throttledMethod.call(this, arguments);
            }
        };
    };
}

