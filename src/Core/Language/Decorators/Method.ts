import DebouncedMethod from './helpers/DebouncedMethod';


export function debounce(
    timeout: number,
    leading: boolean = false,
    trailing: boolean = true,
    maxWait: number = Infinity
): MethodDecorator {
    return function (
        target: Function,
        property: string,
        descriptor: TypedPropertyDescriptor<Function>
    ): TypedPropertyDescriptor<Function> {
        let method: DebouncedMethod = new DebouncedMethod(descriptor.value, timeout, leading, trailing, maxWait);

        descriptor.value = function () {
            method.call(this, arguments);
        };

        return descriptor;
    };
}


export function deprecated(message?: string): MethodDecorator {
    return function (
        target: Function,
        property: string,
        descriptor: TypedPropertyDescriptor<Function>
    ): TypedPropertyDescriptor<Function> {
        let method: Function = descriptor.value;
        let defaultMessage: string = `Method '${property}' is deprecated. It will be removed in future releases.`;

        message = message || defaultMessage;

        descriptor.value = function () {
            console.warn(message);
            method.call(this, arguments);
        };

        return descriptor;
    };
}