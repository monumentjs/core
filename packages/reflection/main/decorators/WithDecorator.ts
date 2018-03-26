import {DecoratorTarget} from '@monument/core/main/decorators/support/DecoratorTarget';
import {DecoratorTargetException} from '@monument/core/main/decorators/support/DecoratorTargetException';
import {Class} from '../Class';
import {DecoratorAccessor} from '../DecoratorAccessor';


export function WithDecorator(decorator: Function) {
    return function (...args: any[]) {
        let element: DecoratorAccessor;
        let target = args[0];
        let name = args[1];
        let index = args[2];
        let decoratorTarget: DecoratorTarget = DecoratorTarget.fromDecoratorArguments(arguments);

        switch (decoratorTarget) {
            case DecoratorTarget.CLASS:
                element = Class.of(target);
                break;

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
                element = Class.of(target).constructorParameters.get(index) as DecoratorAccessor;
                break;

            default:
                throw new DecoratorTargetException(`Decorator "${WithDecorator.name}" cannot be applied to ${DecoratorTarget[decoratorTarget]}`);
        }

        element.decorate(decorator);
    };
}
