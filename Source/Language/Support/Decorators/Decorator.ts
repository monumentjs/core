import {DecoratorTarget} from './DecoratorTarget';
import {CoreType} from '../../../Core/Types/CoreType';


export class Decorator {
    public static findTarget(args: IArguments): DecoratorTarget {
        const [target, key, descriptor] = args;

        if (args.length === 1) {
            if (typeof target === CoreType.Class) {
                return DecoratorTarget.Class;
            }
        } else if (args.length === 3) {
            if (target != null && (typeof target === CoreType.Object || typeof target === CoreType.Class)) {
                if (key != null && (typeof key === CoreType.String || typeof key === CoreType.Number || typeof key === CoreType.Symbol)) {
                    if (descriptor != null && typeof descriptor === CoreType.Object) {
                        if (typeof descriptor.value === CoreType.Function) {
                            return DecoratorTarget.Method;
                        }

                        if (typeof descriptor.get === CoreType.Function || typeof descriptor.set === CoreType.Function) {
                            return DecoratorTarget.Accessor;
                        }
                    }

                    if (typeof descriptor === CoreType.Undefined) {
                        return DecoratorTarget.Property;
                    }

                    if (typeof descriptor === CoreType.Number) {
                        return DecoratorTarget.Parameter;
                    }
                }

                if (key == null) {
                    if (typeof descriptor === CoreType.Number) {
                        return DecoratorTarget.Parameter;
                    }
                }
            }
        }

        return DecoratorTarget.Unknown;
    }
}
