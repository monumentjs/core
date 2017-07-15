import {ReflectionBase} from './ReflectionBase';


export class ClassReflection extends ReflectionBase<Function> {
    public static readonly symbol: symbol = Symbol.for('__class_metadata__');


    public get name(): string {
        return this.entity.name;
    }


    public get classConstructor(): Function {
        return this.entity;
    }


    public constructor(method: Function) {
        super(method, ClassReflection.symbol);
    }
}
