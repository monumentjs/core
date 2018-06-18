import {MethodCallEdge} from './support/MethodCallEdge';
import {DebouncingMethod} from './support/DebouncingMethod';


export function Debounce(timeout: number, edge?: MethodCallEdge) {
    return function (prototype: object, methodName: string, descriptor: TypedPropertyDescriptor<Function>): TypedPropertyDescriptor<Function> {
        const method: Function = descriptor.value as Function;
        const debouncedMethod: DebouncingMethod = new DebouncingMethod(method, timeout, edge);

        return {
            value: function () {
                return debouncedMethod.call(this, arguments);
            }
        };
    };
}

