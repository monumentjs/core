import {DecoratorTarget} from './support/DecoratorTarget';


const ALLOWED_TARGETS = [DecoratorTarget.METHOD];

export function Bind(): MethodDecorator {
    return function (
        prototype: object | Function,
        methodName: PropertyKey,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor {
        DecoratorTarget.testSupport(arguments, ALLOWED_TARGETS);

        const attachedMethod: symbol = Symbol();
        const originalFunction: Function = descriptor.value;

        return {
            get: function (this: any) {

                if (this[attachedMethod] == null) {
                    this[attachedMethod] = originalFunction.bind(this);
                }

                return this[attachedMethod];
            }
        };
    };
}
