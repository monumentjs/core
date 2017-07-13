import {MethodReflection} from './Reflections/MethodReflection';
import {ClassReflection} from './Reflections/ClassReflection';


export class Reflection {
    public static ofClass(method: Function): ClassReflection {
        return new ClassReflection(method);
    }


    public static ofMethod(method: Function): MethodReflection {
        return new MethodReflection(method);
    }
}
