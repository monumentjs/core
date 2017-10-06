import {DecoratorTarget} from '../Support/Decorators/DecoratorTarget';
import {Target} from './Target';


export interface IProfilingConfiguration {
    printArguments?: boolean;
    printReturnValue?: boolean;
    printStack?: boolean;
}


export function Profile(configuration: IProfilingConfiguration = {}): MethodDecorator {
    return (function (
        prototype: object | Function,
        methodName: string,
        descriptor: TypedPropertyDescriptor<Function>
    ): TypedPropertyDescriptor<Function> {
        Target(DecoratorTarget.Method)(...arguments);

        const {printArguments, printReturnValue, printStack} = configuration;
        const method: Function = descriptor.value as Function;
        const className: string = typeof prototype === 'function' ? prototype.name : prototype.constructor.name;

        descriptor.value = function () {
            let startTime: number = Date.now();

            /* tslint:disable:no-console */
            let returnValue: any = method.apply(this, arguments);
            let endTime: number = Date.now();

            console.log(`%s.%s() - Elapsed time: %sms`, className, methodName, (endTime - startTime));

            if (printArguments) {
                console.log(`  Arguments:`, arguments);
            }

            if (printReturnValue) {
                console.log(`  Returns:`, returnValue);
            }

            if (printStack) {
                console.log(`  Trace:`);

                const error = new Error();

                if (error.stack != null) {
                    error.stack.split('\n').slice(1).forEach((line) => {
                        console.log(`    ` + line.trim());
                    });
                }
            }
            /* tslint:enable:no-console */

            return returnValue;
        };

        return descriptor;
    }) as MethodDecorator;
}
