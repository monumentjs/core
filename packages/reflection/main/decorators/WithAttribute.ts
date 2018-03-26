import {DecoratorTarget} from '@monument/core/main/decorators/support/DecoratorTarget';
import {AttributeAccessor} from '@monument/object-model/main/attributes/AttributeAccessor';
import {Key} from '@monument/object-model/main/Key';
import {Class} from '../Class';


export function WithAttribute<T>(key: Key<T>, value: T) {
    return function (...args: any[]) {
        let element: AttributeAccessor;
        let target = args[0];
        let index = args[2];
        let name: string | symbol = args[1];

        switch (DecoratorTarget.fromDecoratorArguments(arguments)) {
            case DecoratorTarget.ACCESSOR:
                element = Class.of(target.constructor).getDeclaredField(name);
                break;

            case DecoratorTarget.METHOD:
                element = Class.of(target.constructor).getDeclaredMethod(name);
                break;

            case DecoratorTarget.METHOD_PARAMETER:
                element = Class.of(target.constructor).getDeclaredMethod(name).getParameterAt(index);
                break;

            case DecoratorTarget.CONSTRUCTOR_PARAMETER:
                element = Class.of(target).constructorParameters.get(index) as AttributeAccessor;
                break;

            default:
                element = Class.of(target);
                break;
        }

        element.setAttribute(key, value);
    };
}
