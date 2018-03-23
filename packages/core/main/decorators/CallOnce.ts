import {DecoratorTarget} from './support/DecoratorTarget';
import {DecoratorException} from './support/DecoratorException';


const ALLOWED_TARGETS = [DecoratorTarget.METHOD];


export function CallOnce(): MethodDecorator {
    return function (prototype: object | Function, methodName: PropertyKey, descriptor: PropertyDescriptor): void {
        DecoratorTarget.testSupport(arguments, ALLOWED_TARGETS);

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
            throw new DecoratorException('Target method is not a function.');
        }
    };
}
