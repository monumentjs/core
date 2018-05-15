

export function Delegate(
    prototype: object | Function,
    methodName: PropertyKey,
    descriptor: PropertyDescriptor
) {
    const key: symbol = Symbol();
    const originalFunction: Function = descriptor.value;

    return {
        get: function (this: any) {
            if (this[key] == null) {
                this[key] = originalFunction.bind(this);
            }

            return this[key];
        }
    };
}
