import {DecoratorTargetException} from './DecoratorTargetException';

// TODO: register separate constants for instance members and static members
export enum DecoratorTarget {
    UNKNOWN,
    CLASS,
    METHOD,
    ACCESSOR,
    PROPERTY,
    METHOD_PARAMETER,
    CONSTRUCTOR_PARAMETER
}


export namespace DecoratorTarget {

    export function fromDecoratorArguments(decoratorArgs: IArguments): DecoratorTarget {
        const [target, key, descriptor] = decoratorArgs;

        if (decoratorArgs.length === 1) {
            if (typeof target === 'function') {
                return DecoratorTarget.CLASS;
            }
        } else if (decoratorArgs.length === 3) {
            if (target != null && (typeof target === 'object' || typeof target === 'function')) {
                if (key != null && (typeof key === 'string' || typeof key === 'number' || typeof key === 'symbol')) {
                    if (descriptor != null && typeof descriptor === 'object') {
                        if (typeof descriptor.value === 'function') {
                            return DecoratorTarget.METHOD;
                        }

                        if (typeof descriptor.get === 'function' || typeof descriptor.set === 'function') {
                            return DecoratorTarget.ACCESSOR;
                        }
                    }

                    if (typeof descriptor === 'undefined') {
                        return DecoratorTarget.PROPERTY;
                    }

                    if (typeof descriptor === 'number') {
                        return DecoratorTarget.METHOD_PARAMETER;
                    }
                }

                if (key == null) {
                    if (typeof descriptor === 'number') {
                        return DecoratorTarget.CONSTRUCTOR_PARAMETER;
                    }
                }
            }
        }

        return DecoratorTarget.UNKNOWN;
    }

    /**
     *
     * @throws {DecoratorTargetException} If decorator applied to wrong target.
     */
    export function testSupport(decoratorArgs: IArguments, allowedTargets: DecoratorTarget[]): void {
        const decoratorType: DecoratorTarget = DecoratorTarget.fromDecoratorArguments(decoratorArgs);

        if (allowedTargets.includes(decoratorType) === false) {
            throw new DecoratorTargetException(`Decorator target (${DecoratorTarget[decoratorType]}) is not supported.`);
        }
    }
}
