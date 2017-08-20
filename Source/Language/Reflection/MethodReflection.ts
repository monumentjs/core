import {ReflectionBase} from './ReflectionBase';
import {Assert} from '../../Assertion/Assert';


export class MethodReflection extends ReflectionBase<Function> {
    public static readonly METADATA_KEY: symbol = Symbol('MethodMetadata');


    public readonly name: string;
    public readonly argumentsCount: number;
    public readonly writable: boolean;
    public readonly enumerable: boolean;
    public readonly configurable: boolean;


    public constructor(method: TypedPropertyDescriptor<Function>) {
        Assert.argument('method', method).notNull();
        Assert.argument('method.value', method.value).notNull();

        let fn = method.value as Function;

        super(fn, MethodReflection.METADATA_KEY);

        this.name = fn.name;
        this.argumentsCount = fn.length;
        this.configurable = method.configurable || false;
        this.enumerable = method.enumerable || false;
        this.writable = method.writable || false;
    }
}
