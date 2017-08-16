

export function Bind(): MethodDecorator {
    return function (
        prototype: object,
        methodName: string,
        descriptor: TypedPropertyDescriptor<Function>
    ): TypedPropertyDescriptor<Function> {
        let method: Function = descriptor.value;
        let attachedMethod: symbol = Symbol(methodName);

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
