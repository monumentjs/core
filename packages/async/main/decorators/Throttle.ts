import {DecoratorTarget} from '@monument/language/main/decorator/registry/DecoratorTarget';
import {ThrottlingMethod} from './support/ThrottlingMethod';
import {MethodCallEdge} from './support/MethodCallEdge';


const ALLOWED_TARGETS = [DecoratorTarget.METHOD];


export function Throttle(
    timeout: number,
    edge?: MethodCallEdge
): MethodDecorator {
    return (function (
        prototype: object,
        methodName: string,
        descriptor: TypedPropertyDescriptor<Function>
    ): TypedPropertyDescriptor<Function> {
        DecoratorTarget.testSupport(arguments, ALLOWED_TARGETS);

        const method: Function = descriptor.value as Function;
        const throttledMethod: ThrottlingMethod = new ThrottlingMethod(method, timeout, edge);

        return {
            value: function () {
                return throttledMethod.call(this, arguments);
            }
        };
    }) as MethodDecorator;
}

