import {ReflectionBase} from './ReflectionBase';


export class MethodReflection extends ReflectionBase<Function> {
    public static readonly METADATA_KEY: symbol = Symbol.for('MethodMetadata');


    public readonly name: string;
    public readonly prototype: object;
    public readonly argumentsCount: number;


    public constructor(method: Function) {
        super(method, MethodReflection.METADATA_KEY);

        this.name = method.name;
        this.prototype = method.prototype;
        this.argumentsCount = method.length;
    }
}
