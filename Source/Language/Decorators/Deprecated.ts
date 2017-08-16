import {MethodReflection} from '../Reflection/MethodReflection';
import {MetadataContainer} from '../Reflection/MetadataContainer';
import {MetadataToken} from '../Reflection/MetadataToken';


const DEPRECATED_METHOD_TOKEN: MetadataToken = new MetadataToken('DeprecatedMethod');


export function Deprecated(message?: string): MethodDecorator {
    return function (
        prototype: object,
        methodName: string,
        descriptor: TypedPropertyDescriptor<Function>
    ): TypedPropertyDescriptor<Function> {
        const method: Function = descriptor.value;
        const reflection: MethodReflection = new MethodReflection(descriptor);
        const metadata: MetadataContainer = reflection.metadata;
        const defaultMessage: string = `Method "${methodName}" is deprecated. It will be removed in future releases.`;

        message = message || defaultMessage;

        descriptor.value = function () {
            if (!metadata.get(DEPRECATED_METHOD_TOKEN, false)) {
                /* tslint:disable:no-console */
                console.warn(message);
                /* tslint:enable:no-console */
                metadata.set(DEPRECATED_METHOD_TOKEN, true);
            }

            method.call(this, arguments);
        };

        return descriptor;
    };
}
