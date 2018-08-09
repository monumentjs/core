

export function Delegate(
    prototype: object,
    methodName: PropertyKey
) {
    const key: symbol = Symbol();
    const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(prototype, methodName);

    if (descriptor == null) {
        return;
    }

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
