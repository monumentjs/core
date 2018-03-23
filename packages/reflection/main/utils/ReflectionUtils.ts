import 'reflect-metadata';
import {Type} from '../../../core/main/Type';


export class ReflectionUtils {
    public static readonly DESIGN_TYPE: string = 'design:type';
    public static readonly DESIGN_RETURN_TYPE: string = 'design:returntype';
    public static readonly DESIGN_ARGUMENT_TYPES: string = 'design:paramtypes';


    public static getConstructorParameterTypes(target: Function): Array<Type<any>> | undefined {
        return Reflect.getMetadata(this.DESIGN_ARGUMENT_TYPES, target);
    }


    public static getClassMetadata<T>(target: Function, metadataKey: string): T | undefined {
        return Reflect.getMetadata(metadataKey, target);
    }


    public static setClassMetadata<T>(target: Function, metadataKey: string, metadataValue: T): void {
        return Reflect.defineMetadata(metadataKey, metadataValue, target);
    }


    public static getClassMemberMetadata<T>(target: object, metadataKey: string, propertyKey: string | symbol): T {
        return Reflect.getMetadata(metadataKey, target, propertyKey);
    }


    public static setClassMemberMetadata<T>(target: object, propertyKey: string | symbol, metadataKey: string, metadataValue: T): void {
        return Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
    }


    public static getStaticPropertyType(target: Function, propertyKey: string | symbol): Type<any> {
        return Reflect.getMetadata(this.DESIGN_TYPE, target, propertyKey);
    }


    public static getPropertyType(target: object, propertyKey: string | symbol): Type<any> {
        return Reflect.getMetadata(this.DESIGN_TYPE, target, propertyKey);
    }


    public static getStaticMethodReturnType(target: Function, methodName: string | symbol): Type<any> {
        return Reflect.getMetadata(this.DESIGN_RETURN_TYPE, target, methodName);
    }


    public static getMethodReturnType(target: object, methodName: string | symbol): Type<any> {
        return Reflect.getMetadata(this.DESIGN_RETURN_TYPE, target, methodName);
    }


    public static getStaticMethodArgumentTypes(target: Function, propertyKey: string | symbol): Array<Type<any>> {
        return Reflect.getMetadata(this.DESIGN_ARGUMENT_TYPES, target, propertyKey);
    }


    public static getMethodArgumentTypes(target: object, propertyKey: string | symbol): Array<Type<any>> {
        return Reflect.getMetadata(this.DESIGN_ARGUMENT_TYPES, target, propertyKey);
    }
}
