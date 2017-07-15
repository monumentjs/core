import {ReflectionBase} from './ReflectionBase';


export class MethodReflection extends ReflectionBase<Function> {
    public static readonly symbol: symbol = Symbol.for('__method_metadata__');


    public get name(): string {
        return this.entity.name;
    }


    public get method(): Function {
        return this.entity;
    }


    public constructor(method: Function) {
        super(method, MethodReflection.symbol);
    }
}
