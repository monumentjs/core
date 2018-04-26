import {Type} from '@monument/core/main/Type';
import {DecoratorTarget} from './DecoratorTarget';
import {DecoratorTargetException} from './DecoratorTargetException';
import {ReflectionUtils} from './utils/ReflectionUtils';
import {Class} from './Class';
import {Method} from './Method';
import {Field} from './Field';
import {Parameter} from './Parameter';


export class Decorator {

    public apply(args: any[]): void {
        let targetType: DecoratorTarget = this.getDecoratorTarget(args);
        let target: any = args[0];
        let key = args[1];
        let descriptor = args[2];
        let klass: Class<any>;
        let method: Method;
        let field: Field;
        let parameter: Parameter;

        switch (targetType) {
            case DecoratorTarget.CLASS:
                klass = Class.of(target);
                this.onClass(klass);
                break;

            case DecoratorTarget.METHOD:
                klass = Class.of(target.constructor);
                method = klass.getMethod(key);
                this.onMethod(klass, method);
                break;

            case DecoratorTarget.FIELD:
                klass = Class.of(target.constructor);
                field = klass.getField(key);
                this.onField(klass, field);
                break;

            case DecoratorTarget.PROPERTY:
                klass = Class.of(target.constructor);
                this.onProperty(klass, key, ReflectionUtils.getPropertyType(target, key));
                break;

            case DecoratorTarget.METHOD_PARAMETER:
                klass = Class.of(target.constructor);
                method = klass.getMethod(key);
                parameter = method.getParameterAt(descriptor);
                this.onMethodParameter(klass, method, parameter);
                break;

            case DecoratorTarget.CONSTRUCTOR_PARAMETER:
                klass = Class.of(target);
                parameter = klass.getParameterAt(descriptor);
                this.onConstructorParameter(klass, parameter);
                break;

            default:
                throw new DecoratorTargetException(`Decorator target is unknown.`);
        }
    }


    protected onClass(klass: Class<any>): void {
        throw new DecoratorTargetException(`Decorator cannot be applied to class.`);
    }


    protected onConstructorParameter(klass: Class<any>, parameter: Parameter): void {
        throw new DecoratorTargetException(`Decorator cannot be applied to constructor parameter.`);
    }


    protected onMethod(klass: Class<any>, method: Method): void {
        throw new DecoratorTargetException(`Decorator cannot be applied to method.`);
    }


    protected onMethodParameter(klass: Class<any>, method: Method, parameter: Parameter): void {
        throw new DecoratorTargetException(`Decorator cannot be applied to method parameter.`);
    }


    protected onField(klass: Class<any>, field: Field): void {
        throw new DecoratorTargetException(`Decorator cannot be applied to field.`);
    }


    protected onProperty(klass: Class<any>, key: string | symbol, type: Type<any> | undefined): void {
        throw new DecoratorTargetException(`Decorator cannot be applied to property.`);
    }


    private getDecoratorTarget(decoratorArgs: any[]): DecoratorTarget {
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
                            return DecoratorTarget.FIELD;
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
}
