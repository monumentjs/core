import {Decorator} from '../Support/Decorators/Decorator';
import {DecoratorTarget} from '../Support/Decorators/DecoratorTarget';
import {DecoratorTargetException} from '../Support/Decorators/DecoratorTargetException';


export function Target(...allowedTargets: DecoratorTarget[]) {
    return function (...args: any[]) {
        const decoratorType = Decorator.findTarget(arguments);

        if (allowedTargets.includes(decoratorType) === false) {
            throw new DecoratorTargetException(`Decorator target (${DecoratorTarget[decoratorType]}) is not supported.`);
        }
    };
}
