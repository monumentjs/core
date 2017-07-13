import { ReflectionBase } from './ReflectionBase';
export declare class ClassReflection extends ReflectionBase<Function> {
    readonly name: string;
    readonly classConstructor: Function;
    constructor(method: Function);
}
