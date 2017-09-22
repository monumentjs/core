import {DecoratorTarget} from '../Support/Decorators/DecoratorTarget';
import {Target} from './Target';


export function Bind(): MethodDecorator {
    return function (prototype: object | Function, methodName: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor {
        Target(DecoratorTarget.Method)(...arguments);

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
