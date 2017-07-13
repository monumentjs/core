import { MethodReflection } from './Reflections/MethodReflection';
import { ClassReflection } from './Reflections/ClassReflection';
export declare class Reflection {
    static ofClass(method: Function): ClassReflection;
    static ofMethod(method: Function): MethodReflection;
}
