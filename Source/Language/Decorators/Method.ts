import {DebouncedMethod} from './helpers/DebouncedMethod';
import {MethodReflection} from '../Reflection/Reflections/MethodReflection';
import {Reflection} from '../Reflection/Reflection';
import {MetadataContainer} from '../Reflection/Metadata/MetadataContainer';


const DEPRECATED_SYMBOL: symbol = Symbol.for('deprecated');


export class Method {
    public static debounce(
        timeout: number,
        leading: boolean = false,
        trailing: boolean = true,
        maxWait: number = Infinity
    ): MethodDecorator {
        return function (
            prototype: object,
            methodName: string,
            descriptor: TypedPropertyDescriptor<Function>
        ): TypedPropertyDescriptor<Function> {
            let method: DebouncedMethod = new DebouncedMethod(descriptor.value, timeout, leading, trailing, maxWait);

            descriptor.value = function () {
                method.call(this, arguments);
            };

            return descriptor;
        };
    }


    public static deprecated(message?: string): MethodDecorator {
        return function (
            prototype: object,
            methodName: string,
            descriptor: TypedPropertyDescriptor<Function>
        ): TypedPropertyDescriptor<Function> {
            let method: Function = descriptor.value;
            let reflection: MethodReflection = Reflection.ofMethod(method);
            let metadata: MetadataContainer = reflection.getMetadata();
            let defaultMessage: string = `Method '${methodName}' is deprecated. It will be removed in future releases.`;

            message = message || defaultMessage;

            descriptor.value = function () {
                if (!metadata.get(DEPRECATED_SYMBOL, false)) {
                    /* tslint:disable:no-console */
                    console.warn(message);
                    /* tslint:enable:no-console */
                    metadata.set(DEPRECATED_SYMBOL, true);
                }

                method.call(this, arguments);
            };

            return descriptor;
        };
    }


    public static attached(): MethodDecorator {
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


    public static profile(): MethodDecorator {
        return function (
            prototype: object,
            methodName: string,
            descriptor: TypedPropertyDescriptor<Function>
        ): TypedPropertyDescriptor<Function> {
            let method: Function = descriptor.value;

            descriptor.value = function () {
                let error = new Error();
                let startTime: number = Date.now();

                /* tslint:disable:no-console */
                console.log(`\nProfile method: ${prototype.constructor.name}.${methodName}:`);
                console.log(`  Arguments:`, arguments);

                let returnValue: any = method.apply(this, arguments);
                let endTime: number = Date.now();

                console.log(`  Returns:`, returnValue);
                console.log(`  Elapsed time: %sms`, (endTime - startTime));
                console.log(`  Trace:`);

                error.stack.split('\n').slice(1).forEach((line) => {
                    console.log(`    ` + line.trim());
                });

                console.log(``);
                /* tslint:enable:no-console */

                return returnValue;
            };

            return descriptor;
        };
    }
}
