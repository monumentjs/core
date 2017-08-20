import {Assert} from '../../Assertion/Assert';


export function Bind(): MethodDecorator {
    return function (
        prototype: object,
        methodName: string,
        descriptor: TypedPropertyDescriptor<Function>
    ): TypedPropertyDescriptor<Function> {
        Assert.argument('descriptor', descriptor).notNull();
        Assert.argument('descriptor.value', descriptor.value).notNull();

        const attachedMethod: symbol = Symbol(methodName);
        const method: Function = descriptor.value as Function;

        return {
            get: function () {
                if (this[attachedMethod] == null) {
                    this[attachedMethod] = method.bind(this);
                }

                return this[attachedMethod];
            }
        };
    };
}
