import DebouncedMethod from '../helpers/DebouncedMethod';


export default function debounce(
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
