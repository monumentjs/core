import {DecoratorTarget} from '../Support/Decorators/DecoratorTarget';
import {Target} from './Target';
import {DecoratorException} from '../Support/Decorators/DecoratorException';


export function CallOnce(): MethodDecorator {
    return function (prototype: object | Function, methodName: PropertyKey, descriptor: PropertyDescriptor): void {
        Target(DecoratorTarget.Method)(...arguments);

        const originalFunction = descriptor.value;
        let isCalled: boolean = false;
        let returnValue: any;

        if (typeof originalFunction === 'function') {
            descriptor.value = function () {
                if (!isCalled) {
                    returnValue = originalFunction.apply(this, arguments);
                    isCalled = true;
                }

                return returnValue;
            };
        } else {
            throw new DecoratorException(CallOnce.name, 'Target method is not a function.');
        }
    };
}
