import {DecoratorTarget} from './support/DecoratorTarget';


export function Target(targets: DecoratorTarget[]) {
    return function (...args: any[]) {
        DecoratorTarget.testSupport(arguments, targets);
    };
}
