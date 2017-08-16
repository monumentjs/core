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

        super(method.value, MethodReflection.METADATA_KEY);

        this.name = method.value.name;
        this.argumentsCount = method.value.length;
        this.configurable = method.configurable;
        this.enumerable = method.enumerable;
        this.writable = method.writable;
    }
}
