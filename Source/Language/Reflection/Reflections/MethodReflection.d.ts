import { ReflectionBase } from './ReflectionBase';
export declare class MethodReflection extends ReflectionBase<Function> {
    readonly name: string;
    readonly method: Function;
    constructor(method: Function);
}
