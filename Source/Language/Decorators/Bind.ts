

export function Bind(): MethodDecorator {
    return function (
        prototype: object,
        methodName: string,
        descriptor: TypedPropertyDescriptor<Function>
    ): TypedPropertyDescriptor<Function> {
        let method: Function = descriptor.value;
        let attachedMethod: symbol = Symbol.for(methodName);

        return {
            get: function () {
                if (!(attachedMethod in this)) {
                    this[attachedMethod] = method.bind(this);
                }

                return this[attachedMethod];
            }
        };
    };
}
