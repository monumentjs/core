import {MethodReflection} from './Reflections/MethodReflection';
import {ClassReflection} from './Reflections/ClassReflection';
import {Constructor} from '../../types';


export class Reflection {
    public static ofClass<T>(type: Constructor<T>): ClassReflection<T> {
        return new ClassReflection(type);
    }


    public static ofMethod(method: Function): MethodReflection {
        return new MethodReflection(method);
    }
}
