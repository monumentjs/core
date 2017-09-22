import {DecoratorTarget} from '../Support/Decorators/DecoratorTarget';
import {Target} from './Target';


export function Profile(): MethodDecorator {
    return (function (
        prototype: object,
        methodName: string,
        descriptor: TypedPropertyDescriptor<Function>
    ): TypedPropertyDescriptor<Function> {
        Target(DecoratorTarget.Method)(...arguments);

        const method: Function = descriptor.value as Function;

        descriptor.value = function () {
            // let error = new Error();
            let startTime: number = Date.now();

            /* tslint:disable:no-console */
            // console.log(`\nProfile method: ${prototype.constructor.name}.${methodName}:`);
            // console.log(`  Arguments:`, arguments);

            let returnValue: any = method.apply(this, arguments);
            let endTime: number = Date.now();

            // console.log(`  Returns:`, returnValue);
            console.log(`%s :: Elapsed time: %sms`, methodName, (endTime - startTime));
            // console.log(`  Trace:`);

            // if (error.stack != null) {
            //     error.stack.split('\n').slice(1).forEach((line) => {
            //         console.log(`    ` + line.trim());
            //     });
            // }
            //
            // console.log(``);
            /* tslint:enable:no-console */

            return returnValue;
        };

        return descriptor;
    }) as MethodDecorator;
}
